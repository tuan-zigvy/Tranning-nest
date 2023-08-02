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
import { IAvailability, IForm, IMetaDataSetting } from '@utils/interface';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'settings' })
export class Setting extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ type: 'text', unique: true, nullable: true })
  name_url?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @Field(() => Number)
  @Column()
  ownerId: number;

  @Field(() => GraphQLJSON)
  @Column({ type: 'json', default: {} })
  availability: IAvailability;

  @Field(() => GraphQLJSON)
  @Column({ type: 'json', default: {} })
  meta_data: IMetaDataSetting;

  @Field(() => GraphQLJSON)
  @Column({ type: 'json', default: {} })
  booking_form: IForm;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
