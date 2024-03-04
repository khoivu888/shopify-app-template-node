import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsBuiltFieldTableTemplate1602204713584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "templates" ADD COLUMN "is_built" boolean;
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "templates" DROP COLUMN "is_built";
      `)
    }

}
