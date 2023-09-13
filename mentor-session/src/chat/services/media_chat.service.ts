import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '@/base.service';

import { MediaChat } from '../entities/Media_chat.entity';
import { MediaChatRepository } from '../repositories/media_chat.repository';

@Injectable()
export class MediaChatService extends BaseService<MediaChat> {
  constructor(
    @InjectRepository(MediaChat)
    private readonly MediaRepository: MediaChatRepository,
  ) {
    super(MediaRepository);
  }
}
