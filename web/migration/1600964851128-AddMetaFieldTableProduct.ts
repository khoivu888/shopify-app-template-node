import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMetaFieldTableProduct1600964851128
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "products" ADD COLUMN "meta_field_id" text;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "products" DROP COLUMN "meta_field_id";
      `)
  }
}
