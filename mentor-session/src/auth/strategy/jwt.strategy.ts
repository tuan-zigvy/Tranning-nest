import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IPayloadToken } from '@/types/base.interface';
import { EKeyHeader } from '@/types/enum';
import authConfig from '@/config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(EKeyHeader.ACCESS_TOKEN),
      ignoreExpiration: false,
      secretOrKey: authConfig().secret,
    });
  }

  validate(payload: IPayloadToken) {
    return { userId: payload.userId, email: payload.email, roles: payload.roles };
  }
}
