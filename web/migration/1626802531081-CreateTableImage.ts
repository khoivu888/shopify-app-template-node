import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableImage1626802531081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE images (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            url text NOT NULL,
            name text NOT NULL,
            shop text NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        ALTER TABLE "templates" ADD COLUMN "image_id" uuid REFERENCES images(id) ON DELETE SET NULL;
        ALTER TABLE "configs" ADD COLUMN "image_id" uuid REFERENCES images(id) ON DELETE SET NULL;

        ALTER TABLE "configs" ADD COLUMN "coordinate_x" float;
        ALTER TABLE "configs" ADD COLUMN "coordinate_y" float;
        ALTER TABLE "configs" ADD COLUMN "width" float;
        ALTER TABLE "configs" ADD COLUMN "height" float;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "configs" DROP COLUMN "height";
        ALTER TABLE "configs" DROP COLUMN "width";
        ALTER TABLE "configs" DROP COLUMN "coordinate_y";
        ALTER TABLE "configs" DROP COLUMN "coordinate_x";

        ALTER TABLE "configs" DROP COLUMN "image_id";
        ALTER TABLE "templates" DROP COLUMN "image_id";

        DROP TABLE IF EXISTS images;
        `)
    }

}
