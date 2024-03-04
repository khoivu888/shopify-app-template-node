import { MigrationInterface, QueryRunner } from 'typeorm'

export class UniquePosition1600416714029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "configs" ADD CONSTRAINT "unique_position" UNIQUE ("template_id","position");
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "configs" DROP CONSTRAINT "unique_position";
    `)
  }
}
