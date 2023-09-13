import { Module } from '@nestjs/common';
import { LoggerCustomService } from './logger.service';

@Module({
  exports: [LoggerCustomService],
  providers: [LoggerCustomService],
})
export class LoggerModule {}
