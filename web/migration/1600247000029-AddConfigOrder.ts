import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddConfigOrder1600247000029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "configs" ADD COLUMN "position" integer NOT NULL DEFAULT 0;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "configs" DROP COLUMN "position";
      `)
  }
}
