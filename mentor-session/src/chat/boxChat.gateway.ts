import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessageChatService } from './services/message_chat.service';
import { MediaChatService } from './services/media_chat.service';
import { BoxChatService } from './services/box_chat.service';

@WebSocketGateway()
export class BoxChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageChatService: MessageChatService,
    private readonly mediaChatService: MediaChatService,
    private readonly boxChatService: BoxChatService,
  ) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    console.log('client ::', client);
    console.log('data ::', data);

    return 'Hello world!';
  }

  async handleConnection(client: Socket) {
    console.log(client);
  }
}
