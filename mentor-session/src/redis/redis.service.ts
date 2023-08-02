import { Injectable } from '@nestjs/common';
import { RedisKey, Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';

type TValueRedis = string | Buffer | number;
@Injectable()
export class RedisServiceCaching {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  async set(key: RedisKey, value: TValueRedis): Promise<string> {
    return this.client.set(key, value);
  }

  async setOne(key: RedisKey, value: RedisKey): Promise<number> {
    return this.client.setnx(key, value);
  }

  // get key and value
  async get(key: string): Promise<any> {
    return this.client.get(key);
  }

  // set pairs key value
  async hSet(key: RedisKey, value: (RedisKey | number)[]): Promise<number> {
    return this.client.hset(key, value);
  }

  async sadd(key: RedisKey, value: (RedisKey | number)[]): Promise<number> {
    return this.client.sadd(key, value);
  }

  async getSadd(key: RedisKey): Promise<string[]> {
    return this.client.smembers(key);
  }

  async deleteValueSadd(
    key: RedisKey,
    value: (string | number | Buffer)[],
  ): Promise<number> {
    return this.client.srem(key, value);
  }

  async countSadd(key: RedisKey): Promise<number> {
    return this.client.scard(key);
  }

  async checkValueSadd(key: RedisKey, value: string | number | Buffer): Promise<number> {
    return this.client.sismember(key, value);
  }

  async hGetAll(key: RedisKey) {
    return this.client.hgetall(key);
  }

  // up down number in hash
  async hIncrBy(key: RedisKey, field: RedisKey, number: number): Promise<number> {
    return this.client.hincrby(key, field, number);
  }

  async incrBy(key: RedisKey, number: number): Promise<number> {
    return this.client.incrby(key, number);
  }

  async decrBy(key: RedisKey, number: number): Promise<number> {
    return this.client.decrby(key, number);
  }

  // limit time delete key value
  async expire(key: RedisKey, value: number): Promise<number> {
    return this.client.expire(key, value);
  }

  async deleteKey(key: RedisKey): Promise<number> {
    return this.client.del(key);
  }

  async getTimeExpires(key: RedisKey): Promise<number> {
    return this.client.ttl(key);
  }
}
// import { Injectable, Inject } from '@nestjs/common';

// import { Cache } from 'cache-manager';

// import { CACHE_MANAGER } from '@nestjs/cache-manager';

// @Injectable()
// export class RedisServiceCaching {
//   constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

//   async get(key: string) {
//     return this.cache.get(key);
//   }

//   async set(key: string, value: unknown, ttl = 0) {
//     await this.cache.set(key, value, ttl);
//   }

//   async del(key: string) {
//     await this.cache.del(key);
//   }

//   async reset() {
//     await this.cache.reset();
//   }
// }
