import { getSwitchContext } from '@utils/otherUtil';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(ctx: ExecutionContext) {
    const context = getSwitchContext(ctx);
    if (context instanceof GqlExecutionContext) {
      const { req } = context.getContext();
      req.body = context.getArgs().signIn;

      return super.canActivate(new ExecutionContextHost([req]));
    }

    return super.canActivate(ctx);
  }
}
