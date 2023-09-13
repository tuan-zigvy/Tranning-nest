/* eslint-disable max-classes-per-file */
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Setting } from '@user/entities/Setting.entity';
import { User } from '@user/entities/User.entity';
import { GraphQLJSON } from 'graphql-scalars';
import { Profile } from '@/user/entities/Profile.entity';
import { IAvailability } from './base.interface';
import { UpdateFormBookingDto } from '@/user/dto/setting.dto';

@ObjectType()
export class UpdateResponse {
  @Field()
  message: string;
}
@ObjectType()
export class Availability implements IAvailability {
  @Field(() => Int)
  duration_session: number; /// 5000s

  @Field(() => [Boolean])
  available_time: boolean[];

  @Field(() => [Number])
  duration_work_per_day: number[];

  @Field(() => Int)
  number_session_per_day: number;

  @Field(() => [Date])
  absent_date: Date[];

  @Field()
  isActive: boolean;
}

@ObjectType()
export class SignInSuccess {
  @Field()
  refresh_token: string;

  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class ATResponse {
  @Field()
  access_token: string;
}

@ObjectType()
export class MentorPageResponse {
  @Field(() => Int)
  id: number;

  @Field()
  avatar: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field(() => [String])
  major: string[];

  @Field()
  setting: Setting;

  @Field()
  profile: Profile;
}

@InputType()
export class IForm {
  @Field(() => GraphQLJSON)
  input: UpdateFormBookingDto;
}
