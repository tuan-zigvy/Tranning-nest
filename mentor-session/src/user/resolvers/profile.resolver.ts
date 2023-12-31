import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guard/access_token.guard';
import { IPayloadToken } from '@utils/interface';
import { UpdateResponse } from '@utils/objectTypeGql';

import { ProfileService } from '../service/profile.service';
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
