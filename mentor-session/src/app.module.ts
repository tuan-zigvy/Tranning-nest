import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RedisModule } from 'nestjs-redis';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DatabaseModule } from './database/database.module.js';
import discordConfig from './config/discord.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import AllExceptionFilter from './filter/exception.filter';
import redisConfig from './config/redis.config';
import { RolesGuard } from './auth/guard/roles.guard';
import authConfig from './config/auth.config';
import { RedisCachingModule } from './redis/redis.module';
import { ICustomGraphQLError, IHttpMessages } from './utils/interface';
import { DateScalar } from './utils/customGql.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [discordConfig, redisConfig, authConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }: IHttpMessages) => ({ req, res }),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: ICustomGraphQLError): ICustomGraphQLError => {
        const graphQLFormattedError: ICustomGraphQLError = {
          message: error?.extensions?.exception?.response || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     isGlobal: true,
    //     url: 'redis://localhost:6379',
    //   }),
    //   inject: [ConfigService],
    // }), // cấu hình container riêng redis để sử dụng redis insight
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        url: `redis://${configService.get('redis_name')}:${configService.get(
          'redis_password',
        )}@${configService.get('redis_host')}:${configService.get('redis_port')}`,
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RedisCachingModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DateScalar,
  ],
})
export class AppModule {}
