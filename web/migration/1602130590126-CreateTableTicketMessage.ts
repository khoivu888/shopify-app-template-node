import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableTicketMessage1602130590126
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE tickets (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            status text,
            shop text,
            title text,
            author text,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
          CREATE TABLE messages (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            shop text,
            content text,
            tickets_id uuid,
            attactments text[],
            sender text,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            FOREIGN KEY (tickets_id) REFERENCES tickets(id)
          );
    
          CREATE TRIGGER set_timestamp
          BEFORE UPDATE ON tickets
          FOR EACH ROW
          EXECUTE PROCEDURE trigger_set_timestamp();
    
          CREATE TRIGGER set_timestamp
          BEFORE UPDATE ON messages
          FOR EACH ROW
          EXECUTE PROCEDURE trigger_set_timestamp();
    
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TRIGGER IF EXISTS set_timestamp ON messages;
    DROP TRIGGER IF EXISTS set_timestamp ON tickets;
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS tickets;
      `)
  }
}
