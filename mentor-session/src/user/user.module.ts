import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisServiceCaching } from '@redis/redis.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

import { User } from './entities/User.entity';
import { Setting } from './entities/Setting.entity';
import { Profile } from './entities/Profile.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserSubscriber } from './subscribers/user.subscribers';
import { SettingService } from './services/setting.service';
import { ProfileService } from './services/profile.service';
import { SettingResolver } from './resolvers/setting.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Setting, Profile])],
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
