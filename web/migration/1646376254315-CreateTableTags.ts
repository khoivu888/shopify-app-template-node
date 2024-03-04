import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableTags1646375451916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE tags (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        shop text NOT NULL,
        template_id uuid NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
        UNIQUE(name, shop),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLES IF EXISTS tags;
    `)
  }
}
