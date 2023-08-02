/* eslint-disable max-classes-per-file */

import { createZodDto } from 'nestjs-zod';
import { InputType, Field } from '@nestjs/graphql';
import dayjs from 'dayjs';
import { z } from 'zod';
import { IMAGE_REGEX } from '@utils/regexUtil';

const InfoSChema = z.intersection(
  z.object({
    background: z.string().regex(IMAGE_REGEX).or(z.string()).default(''),
    head_title: z.string(),
    education: z.array(z.string()),
    achievement: z.array(z.string()).optional(),
    images_achievement: z.array(z.string().regex(IMAGE_REGEX)).optional(),
    position: z.string(),
    current_company_work: z.string().optional(),
    already_company_word: z.array(z.string()),
    experience: z.number().optional(),
    about_me: z.string().optional(),
  }),
  z.record(
    z.string().or(z.number()),
    z.union([
      z.string(),
      z.number(),
      z.array(z.union([z.string(), z.number()])),
      z.boolean(),
      z.date(),
    ]),
  ),
);

const privateInfoSchema = z.intersection(
  z.object({
    birthday: z
      .date()
      .refine((value) => dayjs(value).isBefore(dayjs()))
      .optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    hobby: z.array(z.string()).optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    'city&province': z.string().optional(),
  }),
  z.record(
    z.string().or(z.number()),
    z.union([
      z.string(),
      z.number(),
      z.array(z.union([z.string(), z.number()])),
      z.boolean(),
      z.date(),
    ]),
  ),
);

@InputType()
export class UpdateInfoDto extends createZodDto(InfoSChema) {
  @Field()
  background: string;

  @Field()
  head_title: string;

  @Field(() => [String])
  education: string[];

  @Field(() => [String])
  achievement: string[];

  @Field(() => [String])
  images_achievement: string[];

  @Field()
  position: string;

  @Field()
  current_company_work: string;

  @Field(() => [String])
  already_company_word: string[];

  @Field()
  experience: number;

  @Field()
  about_me: string;
}

@InputType()
export class UpdatePrivateInfoDto extends createZodDto(privateInfoSchema) {
  @Field(() => Date)
  birthday: Date;

  @Field(() => [String])
  hobby: string[];

  @Field()
  address: string;

  @Field()
  country: string;

  @Field()
  'city&province': string;
}

export type PrivateInfoSchema = z.infer<typeof privateInfoSchema>;
export type InfoSchema = z.infer<typeof InfoSChema>;
