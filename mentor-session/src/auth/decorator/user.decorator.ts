import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getSwitchContext } from '@utils/otherUtil';

export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const context = getSwitchContext(ctx);

  if (context instanceof GqlExecutionContext) {
    return context.getContext().req?.user;
  }

  const request = ctx.switchToHttp().getRequest();

  return request?.user;
});
