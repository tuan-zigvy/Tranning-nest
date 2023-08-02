import { ERegistrationType } from '@utils/enum';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import authConfig from '@/config/auth.config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: authConfig().facebookClientId,
      clientSecret: authConfig().facebookSecret,
      callbackURL: 'http://localhost:9000/auth/facebook/redirect',
      scope: ['email', 'public_profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos, birthday, gender } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      gender,
      birthday,
      registrationType: ERegistrationType.GOOGLE,
    };

    done(null, user);
  }
}
