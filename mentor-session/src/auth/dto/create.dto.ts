import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { IMAGE_REGEX, PASSWORD_REGEX } from '@utils/regexUtil';
import { ERegistrationType, ERole } from '@utils/enum';
import { Field, InputType } from '@nestjs/graphql';

const createUserSchema = z
  .object({
    first_name: z.string().max(30),
    last_name: z.string().max(30),
    password: z.string().min(6).max(20).regex(PASSWORD_REGEX),
    email: z.string().email(),
    avatar: z.string().regex(IMAGE_REGEX).optional(),
    major: z.array(z.string()),
    role: z.array(z.enum([ERole.MENTEE, ERole.MENTOR])).optional(),
    registrationType: z
      .array(
        z.enum([
          ERegistrationType.FACEBOOK,
          ERegistrationType.GOOGLE,
          ERegistrationType.PASSWORD,
        ]),
      )
      .default([ERegistrationType.PASSWORD]),
  })
  .strip();

@InputType()
export class CreateUserDto extends createZodDto(createUserSchema) {
  @Field()
  first_name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [String])
  major: string[];

  @Field(() => [String])
  roles: (ERole.MENTEE | ERole.MENTOR)[];
}
