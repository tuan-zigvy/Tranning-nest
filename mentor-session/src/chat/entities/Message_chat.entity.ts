import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntityExtend } from '@/types/entity.interface';
import { MediaChat } from './Media_chat.entity';
import { BoxChat } from './Box_chat.entity';

@Entity({ name: 'chat_messages' })
export class MessageChat extends BaseEntityExtend {
  @Column({ type: 'int' })
  boxChatId: number;

  @ManyToOne(() => BoxChat, (boxChat) => boxChat.messages)
  @JoinColumn()
  boxChat: BoxChat;

  @OneToMany(() => MediaChat, (media) => media.message)
  attachments: MediaChat[];

  @Column({ type: 'boolean' })
  unSeen: boolean;

  @Column({ type: 'text' })
  text: string;
}
