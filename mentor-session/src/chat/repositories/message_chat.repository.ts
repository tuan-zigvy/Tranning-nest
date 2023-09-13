import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MessageChat } from '../entities/Message_chat.entity';

@Injectable()
export class MessageChatRepository extends Repository<MessageChat> {}
