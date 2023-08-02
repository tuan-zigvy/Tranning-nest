import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisServiceCaching } from '@redis/redis.service';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { Setting } from './entities/setting.entity';
import { Profile } from './entities/profile.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserSubscriber } from './subscribers/user.subscribers';
import { SettingService } from './service/setting.service';
import { ProfileService } from './service/profile.service';
import { SettingResolver } from './resolvers/setting.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, User, Setting, Profile])],
  providers: [
    UserService,
    UserResolver,
    SettingResolver,
    RedisServiceCaching,
    UserSubscriber,
    SettingService,
    ProfileService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
