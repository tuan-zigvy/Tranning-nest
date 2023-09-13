/* eslint-disable import/no-cycle */
import { Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { IAvailability, IForm, IMetaDataSetting } from '@/types/base.interface';
import { User } from './User.entity';
import { BaseEntityExtend } from '@/types/entity.interface';

@ObjectType()
@Entity({ name: 'settings' })
export class Setting extends BaseEntityExtend {
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
}
