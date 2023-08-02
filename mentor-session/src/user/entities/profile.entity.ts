/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { IMetaDataProfile } from '@utils/interface';
import { GraphQLJSON } from 'graphql-scalars';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @Field(() => Number)
  @Column()
  ownerId: number;

  @Field(() => GraphQLJSON)
  @Column({ type: 'json', default: {} })
  meta_data: IMetaDataProfile;

  @Field()
  @Column({ type: 'decimal', width: 100, default: 100 })
  score: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
