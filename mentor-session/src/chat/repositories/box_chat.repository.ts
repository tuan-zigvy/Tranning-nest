import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BoxChat } from '../entities/Box_chat.entity';

@Injectable()
export class BoxChatRepository extends Repository<BoxChat> {}
