import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFieldTableTemplateAndConfig1600920136282
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "configs" ADD COLUMN "shop" text NOT NULL;
        ALTER TABLE "templates" ADD COLUMN "shop" text NOT NULL;
        ALTER TABLE "templates" ADD COLUMN "js_file_path" text;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "configs" DROP COLUMN "shop";
        ALTER TABLE "templates" DROP COLUMN "shop";
        ALTER TABLE "templates" DROP COLUMN "js_file_path";
      `)
  }
}
