/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '@/user/entities/Role.entity';

const data = [
  { name: 'admin', allow_delete: true, level: 1 },
  { name: 'mentor', allow_delete: false, level: 0 },
  { name: 'mentee', allow_delete: false, level: 0 },
  { name: 'supporter', allow_delete: true, level: 2 },
];

export class SeedRole21694426120089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(Role, data);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
