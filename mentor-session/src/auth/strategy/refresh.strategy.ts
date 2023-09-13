import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IPayloadToken } from '@/types/base.interface';
import { EKeyHeader } from '@/types/enum';
import authConfig from '@/config/auth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'rf') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(EKeyHeader.REFRESH_TOKEN),
      ignoreExpiration: false,
      secretOrKey: authConfig().secret_rf,
    });
  }

  async validate(payload: IPayloadToken) {
    return { access_token: await this.authService.newAccessToken(payload.userId) };
  }
}
