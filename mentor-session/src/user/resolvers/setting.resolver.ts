import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@guard/access_token.guard';
import { IForm, UpdateResponse } from '@utils/objectTypeGql';
import { IPayloadToken } from '@utils/interface';
import { GetUser } from '@auth/decorator/user.decorator';
import { SettingService } from '../service/setting.service';
import {
  InfoBookingTodoDto,
  UpdateFormBookingDto,
  UpdateAvailabilityDto,
} from '../dto/setting.dto';
import { Public } from '@/auth/decorator/public.decorator';

@UseGuards(JwtAuthGuard)
@Resolver()
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Mutation(() => UpdateResponse)
  async updateAvailability(
    @Args('updateAvailability') updateAvailability: UpdateAvailabilityDto,
    @GetUser() user: IPayloadToken,
  ) {
    return this.settingService.updateAvailability(updateAvailability, user.userId);
  }

  @Mutation(() => UpdateResponse)
  async updateFormBooking(
    @Args('updateAvailability') updateFormBooking: UpdateFormBookingDto,
    @GetUser() user: IPayloadToken,
  ) {
    return this.settingService.updateFormBooking(updateFormBooking, user.userId);
  }

  @Mutation(() => UpdateResponse)
  async updateUrl(@Args('url') url: string, @GetUser() user: IPayloadToken) {
    return this.settingService.updateUrl(user.userId, url);
  }

  @Public()
  @Mutation(() => UpdateResponse)
  async CreateBookingForm(
    @Args('form') form: IForm,
    @Args('dateBooking') info: InfoBookingTodoDto,
  ): Promise<UpdateResponse> {
    return { message: await this.settingService.createBooking(info.date, info.url) };
  }
}
