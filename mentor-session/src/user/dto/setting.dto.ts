/* eslint-disable function-paren-newline */
/* eslint-disable max-classes-per-file */
import { createZodDto } from 'nestjs-zod';
import { InputType, Field, Int } from '@nestjs/graphql';
import * as dayjs from 'dayjs';
import { z } from 'zod';
import ct from 'countries-and-timezones';

const updateAvailabilitySchema = z
  .object({
    duration_session: z
      .number()
      .int()
      .refine((value) => Number.isInteger(value / 900) && value / 900 > 2, {
        message: 'Duration session must be even and divisible by 900',
      }),
    available_time: z.array(z.boolean()).length(7),
    duration_work_per_day: z
      .array(z.number().min(0).max(864000))
      .length(2)
      .refine(
        (value) => value[0] < value[1],
        'Time start work less than time end word and',
      ),
    absent_date: z
      .array(z.date())
      .refine((value) =>
        value.every(
          (e) => e.getTime() > dayjs(new Date().getTime() + 86400).unix(),
          'Day at absent_date must be future and after one day',
        ),
      ),
    isActive: z.boolean().optional(),
    timezone: z.string().refine((value) => ct.getTimezone(value)),
  })
  .refine(
    (data) =>
      data.duration_session <
      data.duration_work_per_day[1] - data.duration_work_per_day[0],
    'Duration_work_per_day must be at least 1 session',
  );

@InputType()
export class UpdateAvailabilityDto extends createZodDto(updateAvailabilitySchema) {
  @Field(() => Int)
  duration_session: number;

  @Field(() => [Boolean])
  available_time: boolean[];

  @Field(() => [Number])
  duration_work_per_day: number[];

  @Field(() => [Date])
  absent_date: Date[];

  @Field()
  timezone: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}

// const updateFormBookingSchema = z.object({
//   email: z.string().min(0),
//   first_name: z.string().min(0),
//   last_name: z.string().min(0),
//   age: z.number().int().min(1).optional(),
//   content: z.string().min(0).optional(),
//   major: z.string().min(0).optional(),
// });

const updateFormBookingSchema = z.intersection(
  z.object({
    email: z.string().min(0),
    first_name: z.string().min(0),
    last_name: z.string().min(0),
    age: z.number().int().min(1).optional(),
    content: z.string().min(0).optional(),
    major: z.string().min(0).optional(),
  }),
  z.record(
    z.string().or(z.number()),
    z.union([
      z.string(),
      z.number(),
      z.array(z.union([z.string(), z.number()])),
      z.boolean(),
    ]),
  ),
); // => { [k: string | number ]: number | string | (string | number)[]  | boolean  }

const infoBookingSchema = z
  .object({
    date: z
      .date()
      .refine(
        (value) => !dayjs(value).isBefore(dayjs()),
        'Cant booking session before now',
      ),
    url: z.string(),
  })
  .strip();
@InputType()
export class InfoBookingTodoDto extends createZodDto(infoBookingSchema) {
  @Field()
  date: Date;

  @Field()
  url: string;
}

@InputType()
export class UpdateFormBookingDto extends createZodDto(updateFormBookingSchema) {
  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  content?: string;
}
