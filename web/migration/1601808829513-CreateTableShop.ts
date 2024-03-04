import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableShop1601808829513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE shops (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          shop text UNIQUE,
          package_plan text,
          id_subscription text,
          is_active boolean,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON shops
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TRIGGER IF EXISTS set_timestamp ON shops;
    DROP TABLE IF EXISTS shops;
  `)
  }
}
