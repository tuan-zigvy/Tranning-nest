import { Controller, Res, Post, UseGuards, Body, Get } from '@nestjs/common';
import { User } from '@user/entities/User.entity';
import { Response } from 'express';
import authConfig from '@config/auth.config';
import { ERegistrationType } from '@/types/enum';
import { IFacebookUser, IGoogleUser } from '@/types/base.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from './dto/create.dto';
import { RfAuthGuard } from './guard/refresh_token.guard';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { FacebookAuthGuard } from './guard/fb-auth.guard';
import { GetUser } from './decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  async signIn(@Res() req: { user: User }) {
    return this.authService.signIn(req.user);
  }

  @Post('/signUp')
  createUser(@Body() newUser: CreateUserDto) {
    return this.authService.createUser(newUser, ERegistrationType.PASSWORD);
  }

  @UseGuards(RfAuthGuard)
  @Post('/new-at')
  getNewAccessToken(@Res() req: any) {
    return { access_token: req.user.access_token };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  authGoogle() {
    return {};
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async getGoogleSuccess(@GetUser() user: IGoogleUser, @Res() res: Response) {
    const token = await this.authService.createUserByGoogle(user);

    return res.redirect(`${authConfig().url_client}?token=${token}`);
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  authFacebook() {
    return {};
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async getFacebookSuccess(@GetUser() user: IFacebookUser, @Res() res: Response) {
    const token = await this.authService.createUserByFacebook(user);

    return res.redirect(`${authConfig().url_client}?token:${token}`);
  }

  // @Post('/signInThirdParty/:token')
  // async signInThirdParty(@Param('token') token: string) {
  //   // return this.authService.signIn(req.user);
  // }
}
