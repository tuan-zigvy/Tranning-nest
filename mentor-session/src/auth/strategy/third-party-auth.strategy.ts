import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EKeyHeader } from '@utils/enum';
import { IPayloadToken } from '@utils/interface';
import authConfig from '@config/auth.config';

import { Request } from 'express';
import { RedisServiceCaching } from '@/redis/redis.service';

@Injectable()
export class ThirdPartyStrategy extends PassportStrategy(Strategy, 'thirdParty-auth') {
  constructor(private redisServer: RedisServiceCaching) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(EKeyHeader.AUTH_TOKEN),
      ignoreExpiration: false,
      secretOrKey: authConfig().secret_auth,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IPayloadToken) {
    const token: string = await this.redisServer.get(`authToken:${payload.userId}`);

    if (token !== req.headers[EKeyHeader.AUTH_TOKEN]) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!token) throw new UnauthorizedException('Unauthorized');

    await this.redisServer.deleteKey(`authToken:${payload.userId}`);

    return { userId: payload.userId, email: payload.email, roles: payload.roles };
  }
}
