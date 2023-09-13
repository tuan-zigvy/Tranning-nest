import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRole1694426012742 implements MigrationInterface {
  name = 'SeedRole1694426012742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "profiles" ADD "name_url" text');
    await queryRunner.query(
      'ALTER TABLE "profiles" ADD CONSTRAINT "UQ_dce20c37c6aa774e363039dfcd9" UNIQUE ("name_url")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "profiles" DROP CONSTRAINT "UQ_dce20c37c6aa774e363039dfcd9"',
    );
    await queryRunner.query('ALTER TABLE "profiles" DROP COLUMN "name_url"');
  }
}
