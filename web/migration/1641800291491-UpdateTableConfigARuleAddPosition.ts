import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTableConfigARuleAddPosition1641800291491
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE condition_rules ADD COLUMN position integer;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE condition_rules DROP COLUMN position;
      `)
  }
}
