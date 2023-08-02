import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { getSwitchContext } from '@utils/otherUtil';

@Injectable()
export class ThirdPartyAuthGuard extends AuthGuard('thirdParty-auth') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    const context = getSwitchContext(ctx);
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (context instanceof GqlExecutionContext) {
      const { req } = context.getContext();
      return super.canActivate(new ExecutionContextHost([req]));
    }

    return super.canActivate(ctx);
  }
}
