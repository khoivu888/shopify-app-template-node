import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatabase1599893909763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE templates (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          name text UNIQUE,
          description text,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE products (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          template_id uuid,
          link_product_shopify text,
          shop text,
          shopify_id text UNIQUE,
          title text,
          image_url text,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          FOREIGN KEY (template_id) REFERENCES templates(id)
        );

        CREATE TABLE configs (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          template_id uuid,
          type text,
          label text,
          default_value text,
          number_of_line integer,
          line_height float,
          max_character integer,
          required boolean,
          heading text,
          heading_as_tab boolean,
          instruction text,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          FOREIGN KEY (template_id) REFERENCES templates(id)
        );

        -- +migrate StatementBegin
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
            BEGIN
              NEW.updated_at = NOW();
              RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;
        -- +migrate StatementEnd

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON templates
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON products
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON configs
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS set_timestamp ON configs;
      DROP TRIGGER IF EXISTS set_timestamp ON products;
      DROP TRIGGER IF EXISTS set_timestamp ON templates;
      DROP FUNCTION IF EXISTS trigger_set_timestamp();

      DROP TABLE IF EXISTS configs;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS templates;
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `)
  }
}
