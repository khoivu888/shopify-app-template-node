import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTableConfigAddCondition1641270918801
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE configs ADD COLUMN condition jsonb;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE configs DROP COLUMN condition;
    `)
  }
}
