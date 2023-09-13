/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { Entity, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Profile } from './Profile.entity';
import { Setting } from './Setting.entity';
import { BaseEntityExtend } from '@/types/entity.interface';
import { ERole } from '@/types/enum';
import { BoxChat } from '@/chat/entities/Box_chat.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntityExtend {
  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.owner, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @Field(() => Setting)
  @OneToOne(() => Setting, (setting) => setting.owner, { cascade: true })
  @JoinColumn()
  setting: Setting;

  @ManyToMany(() => BoxChat)
  @JoinTable({
    name: 'chat_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'box_chat_id',
      referencedColumnName: 'id',
    },
  })
  conversations: BoxChat[];

  @Column({ select: false, nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', default: '' })
  avatar?: string;

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  major: string[];

  @Field(() => [String])
  @Column({ type: 'simple-array', default: ERole.MENTEE })
  roles: ERole[];

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  registrationType: string[];
}
