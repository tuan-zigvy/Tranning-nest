/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Query,
  Resolver,
  ResolveField,
  Int,
  Mutation,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guard/access_token.guard';
import { RedisServiceCaching } from '@redis/redis.service';
import { MentorPageResponse, UpdateResponse } from '@utils/objectTypeGql';
import { IPayloadToken } from '@utils/interface';
import { GetUser } from '@auth/decorator/user.decorator';
import { Public } from '@auth/decorator/public.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { UpdateAllUserDto, UpdateUserDto, UpdatePsDto } from '../dto/user.dto';
import { ProfileService } from '../service/profile.service';
import { SettingService } from '../service/setting.service';
import { Setting } from '../entities/setting.entity';
import { Profile } from '../entities/profile.entity';

interface IMessageUpdate {
  message: string;
}

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private redisServer: RedisServiceCaching,
    private settingService: SettingService,
    private profileService: ProfileService,
  ) {}

  @Query(() => User)
  async me(@GetUser() user: IPayloadToken) {
    const userDb = await this.userService.findById(user.userId);

    return userDb;
  }

  @Query(() => MentorPageResponse)
  @Public()
  async getPageMentor(@Args('url') url: string): Promise<MentorPageResponse> {
    const dataRedis: MentorPageResponse = JSON.parse(
      await this.redisServer.get(`page-mentor::${url}`),
    );
    if (dataRedis) {
      const bookingList = await this.redisServer.getSadd(`$booking-list::${url}`);
      dataRedis.setting.availability.bookingList = bookingList;
      return dataRedis;
    }

    const settingDb = await this.settingService.findByUrl(url);
    const userDb = await this.userService.getUserByPageUrl(settingDb.ownerId);

    const bookingList = await this.redisServer.getSadd(`$booking-list::${url}`);

    await this.redisServer.set(`page-mentor::${url}`, JSON.stringify(userDb));
    await this.redisServer.expire(`page-mentor::${url}`, 60 * 60 * 12);

    userDb.setting.availability.bookingList = bookingList;
    return userDb as MentorPageResponse;
  }

  @Mutation(() => User)
  async updateAllUser(
    @Args('input') input: UpdateAllUserDto,
    @GetUser() user: IPayloadToken,
  ): Promise<User> {
    const updatedUser = await this.userService.update(user.userId, input);

    return updatedUser;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserDto,
    @GetUser() user: IPayloadToken,
  ): Promise<User> {
    const updatedUser = await this.userService.update(user.userId, input);

    return updatedUser;
  }

  @Mutation(() => UpdateResponse)
  async updatePassword(
    @Args('input') input: UpdatePsDto,
    @GetUser() user: IPayloadToken,
  ): Promise<IMessageUpdate> {
    const updatedUser = await this.userService.updatePassword(
      user.email,
      input.oldPassword,
      input.newPassword,
    );

    return { message: updatedUser };
  }

  @ResolveField(() => Setting)
  async setting(@Parent() me: User): Promise<Setting> {
    return this.settingService.getSetting(me);
  }

  @ResolveField(() => Profile)
  async profile(@Parent() me: User): Promise<Profile> {
    return this.profileService.getProfile(me);
  }
}
