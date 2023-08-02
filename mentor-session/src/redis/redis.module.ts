import { Module } from '@nestjs/common';
import { RedisServiceCaching } from './redis.service';

@Module({
  providers: [RedisServiceCaching],
  exports: [RedisServiceCaching],
})
export class RedisCachingModule {}
