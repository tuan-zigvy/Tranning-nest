import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ERole } from '@utils/enum';
import { getSwitchContext } from '@utils/otherUtil';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const context = getSwitchContext(ctx);

    const roles = this.reflector.get<string>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    if (context instanceof GqlExecutionContext) {
      const { user } = context.getContext().req;
      return user.roles.includes(roles as ERole);
    }

    const { user } = context.switchToHttp().getRequest();

    return user.roles.includes(roles as ERole);
  }
}
