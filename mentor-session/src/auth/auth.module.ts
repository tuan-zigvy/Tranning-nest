import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { RedisCachingModule } from '@redis/redis.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { AuthResolver } from './auth.resolver';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { ThirdPartyStrategy } from './strategy/third-party-auth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('secret'),
      }),
      inject: [ConfigService],
    }),
    RedisCachingModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    AuthResolver,
    GoogleStrategy,
    FacebookStrategy,
    ThirdPartyStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

// "migrate:create": "typeorm migration:create ./src/database/migrations -n",
//     "migrate:generate": "npx typeorm-ts-node-esm migration:generate -d
// ./src/database/migrations -n",
//     "migrate:up": "npx typeorm-ts-node-esm migration:run -- -d .src/database/pq.database.ts",
//     "migrate:down": "npx typeorm-ts-node-esm migration:revert",
