/* eslint-disable import/no-cycle */
import { Column, Entity } from 'typeorm';
import { BaseEntityExtend } from '@/types/entity.interface';

@Entity({ name: 'roles' })
export class Role extends BaseEntityExtend {
  @Column({ type: 'text', unique: true })
  name?: string;

  @Column({ type: 'boolean' })
  allow_delete: boolean;

  @Column({ type: 'boolean', default: false })
  allow_update: boolean;

  @Column({ type: 'int' })
  level: number;
}
