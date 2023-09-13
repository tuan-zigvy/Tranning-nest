/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createZodDto } from 'nestjs-zod';
import { IMAGE_REGEX, PASSWORD_REGEX } from '@utils/regexUtil';
import { InputType, Field } from '@nestjs/graphql';

import { z } from 'zod';
import { ERole } from '@/types/enum';

export const updateUserSchema = z
  .object({
    first_name: z.string().max(30),
    last_name: z.string().max(30),
    avatar: z.string().regex(IMAGE_REGEX).optional(),
    major: z.array(z.string()),
    roles: z.array(z.enum([ERole.MENTEE, ERole.MENTOR])),
  })
  .strip();

@InputType()
export class UpdateAllUserDto extends createZodDto(updateUserSchema) {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field((type) => [String])
  major: string[];

  @Field((type) => [String])
  roles: (ERole.MENTEE | ERole.MENTOR)[];
}

@InputType()
export class UpdateUserDto extends createZodDto(updateUserSchema.deepPartial()) {
  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [String], { nullable: true })
  major?: string[];

  @Field(() => [String], { nullable: true })
  roles?: (ERole.MENTEE | ERole.MENTOR)[];
}

export const updatePwSchema = z
  .object({
    oldPassword: z.string().max(30).min(0),
    newPassword: z.string().regex(PASSWORD_REGEX),
    confirmPassword: z.string(),
  })
  .strip()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The new password did not match',
      });
    }
  })
  .superRefine(({ oldPassword, newPassword }, ctx) => {
    if (oldPassword === newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not same new password',
      });
    }
  });

@InputType()
export class UpdatePsDto extends createZodDto(updatePwSchema) {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;

  @Field()
  confirmPassword?: string;
}
