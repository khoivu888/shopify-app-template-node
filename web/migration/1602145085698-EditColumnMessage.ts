import { MigrationInterface, QueryRunner } from 'typeorm'

export class EditColumnMessage1602145085698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "messages" DROP COLUMN "tickets_id";
      `)
    await queryRunner.query(`
      ALTER TABLE "messages" ADD COLUMN "ticket_id" uuid;
    `)
    await queryRunner.query(`
    ALTER TABLE "messages" DROP COLUMN "attactments";
  `)
    await queryRunner.query(`
  ALTER TABLE "messages" ADD COLUMN "attactments" text;
`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "messages" DROP COLUMN "attactments";
    `)
    await queryRunner.query(`
    ALTER TABLE "messages" ADD COLUMN "attactments" text[];
    `)
    await queryRunner.query(`
    ALTER TABLE "messages" DROP COLUMN "ticket_id";
  `)
    await queryRunner.query(`
  ALTER TABLE "messages" ADD COLUMN "tickets_id" uuid;
`)
  }
}
