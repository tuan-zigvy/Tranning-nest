/* eslint-disable import/no-cycle */
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { GraphQLJSON } from 'graphql-scalars';
import { Field, ObjectType } from '@nestjs/graphql';
import { IMetaDataProfile } from '@/types/base.interface';
import { User } from './User.entity';
import { BaseEntityExtend } from '@/types/entity.interface';

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile extends BaseEntityExtend {
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
}
