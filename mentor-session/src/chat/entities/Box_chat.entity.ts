/* eslint-disable import/no-cycle */
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntityExtend } from '@/types/entity.interface';
import { MessageChat } from './Message_chat.entity';
import { User } from '@/user/entities/User.entity';
import { UserChat } from './User_chat.entity';

@Entity({ name: 'box_chats' })
export class BoxChat extends BaseEntityExtend {
  @OneToMany(() => MessageChat, (message) => message.boxChat)
  messages: MessageChat[];

  @OneToMany(() => UserChat, (userChat) => userChat.boxChat)
  userChats?: UserChat[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'chat_user',
    joinColumn: {
      name: 'box_chat_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
