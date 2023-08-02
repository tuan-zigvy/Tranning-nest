import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const signInSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

@InputType()
export class SignInDto extends createZodDto(signInSchema) {
  @Field()
  email: string;

  @Field()
  password: string;
}
