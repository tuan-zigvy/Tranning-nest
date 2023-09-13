import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guard/access_token.guard';
import { UpdateResponse } from '@/types/objectTypeGql';
import { IPayloadToken } from '@/types/base.interface';

import { ProfileService } from '../services/profile.service';
import { GetUser } from '@/auth/decorator/user.decorator';
import { UpdateInfoDto, UpdatePrivateInfoDto } from '../dto/profile.dto';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => UpdateResponse)
  async updatePrivateInfo(
    @Args('newInfoPrivate') newInfoPrivate: UpdatePrivateInfoDto,
    @GetUser() user: IPayloadToken,
  ) {
    return this.profileService.updatePrivateInfo(newInfoPrivate, user.userId);
  }

  @Mutation(() => UpdateResponse)
  async updateInfo(
    @Args('newInfoPrivate') newInfo: UpdateInfoDto,
    @GetUser() user: IPayloadToken,
  ) {
    return this.profileService.updateInfo(newInfo, user.userId);
  }
}
