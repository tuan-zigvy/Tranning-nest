import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxChat } from './entities/Box_chat.entity';

import { BoxChatGateway } from './boxChat.gateway';
import { MessageChat } from './entities/Message_chat.entity';
import { UserChat } from './entities/User_chat.entity';
import { MediaChat } from './entities/Media_chat.entity';
import { UserModule } from '@/user/user.module';
import { BoxChatService } from './services/box_chat.service';
import { MediaChatService } from './services/media_chat.service';
import { MessageChatService } from './services/message_chat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoxChat, MessageChat, UserChat, MediaChat]),
    UserModule,
  ],
  providers: [BoxChatGateway, BoxChatService, MediaChatService, MessageChatService],
})
export class BoxChatModule {}
