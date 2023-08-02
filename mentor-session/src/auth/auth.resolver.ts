import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ATResponse, SignInSuccess, UpdateResponse } from '@utils/objectTypeGql';
import { User } from '@user/entities/user.entity';
import { ERegistrationType } from '@utils/enum';
import { IPayloadToken } from '@utils/interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CreateUserDto } from './dto/create.dto';
import { RfAuthGuard } from './guard/refresh_token.guard';
import { SignInDto } from './dto/signIn.dto';
import { GetUser } from './decorator/user.decorator';
import { ThirdPartyAuthGuard } from './guard/third-party-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInSuccess)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('signIn') signIn: SignInDto,
    @GetUser() user: User,
  ): Promise<SignInSuccess> {
    return this.authService.signIn(user);
  }

  @Mutation(() => UpdateResponse)
  async createUser(@Args('create') create: CreateUserDto): Promise<UpdateResponse> {
    return {
      message: await this.authService.createUser(create, ERegistrationType.PASSWORD),
    };
  }

  @UseGuards(RfAuthGuard)
  @Mutation(() => ATResponse)
  getNewAccessToken(@GetUser() user: any): ATResponse {
    return { access_token: user.access_token };
  }

  @UseGuards(ThirdPartyAuthGuard)
  @Mutation(() => SignInSuccess)
  async signInThirdParty(@GetUser() user: IPayloadToken): Promise<SignInSuccess> {
    return this.authService.signInThirdParty(user);
  }
}
