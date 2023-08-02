import { ExecutionContext, Injectable } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { getSwitchContext } from '@utils/otherUtil';

@Injectable()
export class RfAuthGuard extends AuthGuard('rf') {
  canActivate(ctx: ExecutionContext) {
    const context = getSwitchContext(ctx);

    if (context instanceof GqlExecutionContext) {
      const { req } = context.getContext();

      return super.canActivate(new ExecutionContextHost([req]));
    }

    return super.canActivate(ctx);
  }
}
