import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MediaChat } from '../entities/Media_chat.entity';

@Injectable()
export class MediaChatRepository extends Repository<MediaChat> {}
