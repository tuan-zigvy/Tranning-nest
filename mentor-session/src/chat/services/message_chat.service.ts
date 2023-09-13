import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageChat } from '../entities/Message_chat.entity';
import BaseService from '@/base.service';
import { MessageChatRepository } from '../repositories/message_chat.repository';

@Injectable()
export class MessageChatService extends BaseService<MessageChat> {
  constructor(
    @InjectRepository(MessageChat)
    private readonly messageRepository: MessageChatRepository,
  ) {
    super(messageRepository);
  }
}
