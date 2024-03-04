import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUniqueNameTemplate1605457137828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      ALTER TABLE "templates" DROP CONSTRAINT "templates_name_key";
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      ALTER TABLE "templates" ADD UNIQUE (name);
      `)
    }

}
