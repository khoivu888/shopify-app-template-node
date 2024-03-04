import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateTableTag1646453452814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE tags ALTER template_id DROP NOT NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
