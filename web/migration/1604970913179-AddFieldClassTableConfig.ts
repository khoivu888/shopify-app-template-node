import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFieldClassTableConfig1604970913179
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "configs" ADD COLUMN "class" text;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "configs" DROP COLUMN "class";
      `)
  }
}
