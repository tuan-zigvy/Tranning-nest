import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { User } from '@user/entities/User.entity';
import { RedisServiceCaching } from '@redis/redis.service';
import { UserService } from '@/user/services/user.service';
import { IFacebookUser, IGoogleUser, IPayloadToken } from '@/types/base.interface';
// import { LoginDto } from './dto/login.dto';
import { ERegistrationType, ERole } from '@/types/enum';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private configServer: ConfigService,
    private redis: RedisServiceCaching,
  ) {}

  // async signIn(dto: LoginDto) {
  //   // find the user by email
  //   const user = await this.userService.findByEmail(dto.email);
  //   // if user does not exist throw exception
  //   if (!user) {
  //     throw new ForbiddenException('Credentials incorrect');
  //   }

  //   // compare password
  //   const pwMatches = await argon.verify(user.password, dto.password);
  //   // if password incorrect throw exception
  //   if (!pwMatches) {
  //     throw new ForbiddenException('Credentials incorrect');
  //   }
  //   return this.signToken(user.id, user.email, user.roles);
  // }

  async signToken(
    userId: number,
    email: string,
    role: ERole[],
  ): Promise<{ access_token: string }> {
    const payload = {
      id: userId,
      email,
      role,
    };

    const secret = this.configServer.get('secret');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2 days',
      secret,
    });

    return {
      access_token: token,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    return this.userService.getUser(email, pass);
  }

  async signIn(user: User) {
    const payload: IPayloadToken = {
      email: user.email,
      userId: user.id,
      roles: user.roles,
    };

    const secret = this.configServer.get('secret');
    const secretRf = this.configServer.get('secret_rf');

    return {
      user,
      access_token: this.jwt.sign(payload, {
        expiresIn: this.configServer.get('accessToken_ex'),
        secret,
      }),
      refresh_token: this.jwt.sign(payload, {
        expiresIn: this.configServer.get('refreshToken_ex'),
        secret: secretRf,
      }),
    };
  }

  async createUser(user: CreateUserDto, type: ERegistrationType): Promise<string> {
    // user.password = await argon.hash(user.password);
    if (type === 'password' && !user.password) {
      throw new BadGatewayException('Sign up must have password');
    }
    await this.userService.store(user);
    return 'Create user success';
  }

  async createUserByAdmin(user: CreateUserDto, type: ERegistrationType): Promise<string> {
    // user.password = await argon.hash(user.password);
    if (type !== 'password') {
      throw new BadGatewayException('Sign up must have password');
    }

    await this.userService.store(user);

    return 'Create user success';
  }

  async newAccessToken(id: number) {
    const userDb = await this.userService.findById(id);

    if (!userDb) throw new NotFoundException('Not Found user');

    const payload: IPayloadToken = {
      email: userDb.email,
      userId: userDb.id,
      roles: userDb.roles,
    };

    const secret = this.configServer.get('secret');

    return this.jwt.sign(payload, {
      expiresIn: this.configServer.get('accessToken_ex'),
      secret,
    });
  }

  async createUserByGoogle(newUser: IGoogleUser) {
    const userDb = await this.userService.findByEmail(newUser.email);

    if (userDb) {
      if (!userDb.registrationType.includes(ERegistrationType.GOOGLE)) {
        userDb.registrationType.push(ERegistrationType.GOOGLE);

        await userDb.save();
      }

      return this.createTokenAuth(userDb);
    }

    const user = new User();
    user.first_name = newUser.firstName;
    user.last_name = newUser.lastName;
    user.email = newUser.email;
    user.registrationType = [ERegistrationType.GOOGLE];
    user.avatar = newUser.picture;
    user.major = [];

    const result = await user.save();

    return this.createTokenAuth(result);
  }

  async createUserByFacebook(newUser: IFacebookUser) {
    const userDb = await this.userService.findByEmail(newUser.email);

    if (userDb) {
      if (!userDb.registrationType.includes(ERegistrationType.FACEBOOK)) {
        userDb.registrationType.push(ERegistrationType.FACEBOOK);

        await userDb.save();
      }

      return this.createTokenAuth(userDb);
    }

    const user = new User();
    user.first_name = newUser.firstName;
    user.last_name = newUser.lastName;
    user.email = newUser.email;
    user.registrationType = [ERegistrationType.FACEBOOK];
    user.avatar = newUser.picture;
    user.major = [];

    const result = await user.save();

    return this.createTokenAuth(result);
  }

  async createTokenAuth(user: User) {
    const payload: IPayloadToken = {
      email: user.email,
      userId: user.id,
      roles: user.roles,
    };

    const token = this.jwt.sign(payload, {
      expiresIn: 300,
      secret: this.configServer.get('secret_auth'),
    });

    await this.redis.set(`authToken:${user.id}`, token);

    await this.redis.expire(`authToken:${user.id}`, 300);

    return token;
  }

  async signInThirdParty(token: IPayloadToken) {
    const userDb = await this.userService.findById(token.userId);
    if (!userDb) throw new NotFoundException('Not found user');

    return this.signIn(userDb);
  }
}
