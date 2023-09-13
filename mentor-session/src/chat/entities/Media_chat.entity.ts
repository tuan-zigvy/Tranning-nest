import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityExtend } from '@/types/entity.interface';
import { MessageChat } from './Message_chat.entity';

@Entity({ name: 'chat_medias' })
export class MediaChat extends BaseEntityExtend {
  @Column({ type: 'simple-array' })
  file_path: string[];

  @Column()
  messageId: number;

  @ManyToOne(() => MessageChat, (message) => message.attachments)
  @JoinColumn()
  message: MessageChat;
}
