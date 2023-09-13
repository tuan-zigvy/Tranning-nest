import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getFilterData } from '@utils/otherUtil';
import { RedisServiceCaching } from '@redis/redis.service';
import BaseService from '@/base.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/User.entity';
import pwdUtil from '@/utils/pwdUtil';

interface IUserWithPassword extends User {
  password: string;
}

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly redisServer: RedisServiceCaching,
  ) {
    super(userRepository);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUser(email: string, pass: string, isHavePs = false) {
    const userDb = await this.userRepository.findOne({
      where: { email },
      select: [
        'registrationType',
        'avatar',
        'first_name',
        'last_name',
        'createdAt',
        'updatedAt',
        'password',
        'email',
        'major',
        'roles',
        'id',
      ],
    });

    if (!userDb) throw new NotFoundException('Not found user');

    const pwMatches = await this.checkPassword(userDb.password, pass);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    if (!isHavePs) {
      const { password, ...result } = userDb;
      return result;
    }
    return userDb;
  }

  async checkPassword(hash: string, password: string) {
    return pwdUtil.getCompare(hash, password);
  }

  async updatePassword(email: string, oldPassword: string, newPassword: string) {
    const user = (await this.getUser(email, oldPassword, true)) as IUserWithPassword;

    user.password = newPassword;
    await user.save();
    return 'update success';
  }

  override async store(data: any) {
    const { password, ...other } = await this.userRepository.save(data);
    return other;
  }

  async getUserByPageUrl(id: number) {
    const userDb = await this.userRepository.findOne({
      where: { id },
      select: [
        'avatar',
        'setting',
        'profile',
        'first_name',
        'last_name',
        'email',
        'major',
        'id',
      ],
      relations: { setting: true, profile: true },
    });

    userDb.profile.meta_data = getFilterData(['info'], userDb.profile.meta_data);

    return userDb;
  }
}
