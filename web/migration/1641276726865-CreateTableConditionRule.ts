import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableConditionRule1641276726865
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE condition_rules (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            config_id uuid REFERENCES configs(id) ON DELETE CASCADE,
            target_config_id uuid REFERENCES configs(id) ON DELETE CASCADE,
            logic text,
            value text,
            type text,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS condition_rules;
    `)
  }
}
