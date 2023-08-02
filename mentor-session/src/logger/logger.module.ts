import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { LoggerDiscord } from './loggerDiscord';

@Module({
  imports: [DiscordModule.forFeature()],
  exports: [LoggerDiscord],
  providers: [LoggerDiscord],
})
export class LoggerModule {}
