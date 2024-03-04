import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTableConfigAddOptions1641432271795
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE configs ADD COLUMN options jsonb;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE configs DROP COLUMN options;
    `)
  }
}
