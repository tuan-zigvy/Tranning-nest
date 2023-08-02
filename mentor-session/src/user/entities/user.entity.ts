/* eslint-disable import/no-cycle */
import { ERole } from '@utils/enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Setting } from './setting.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
