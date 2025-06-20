import { Generated, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export interface Database {
  user: UserTable;
}

export interface UserTable {
  id: Generated<number>;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'ccm',
    host: 'localhost',
    user: 'ccm',
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
