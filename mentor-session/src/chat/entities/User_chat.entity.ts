import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntityExtend } from '@/types/entity.interface';
import { BoxChat } from './Box_chat.entity';

@Entity({ name: 'chat_users' })
export class UserChat extends BaseEntityExtend {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  box_chat_id: number;

  @Column({ name: 'boxChatId', nullable: true })
  boxChatId: number;

  @ManyToOne(() => BoxChat, (boxChat) => boxChat.userChats)
  @JoinColumn()
  boxChat?: BoxChat;
}
