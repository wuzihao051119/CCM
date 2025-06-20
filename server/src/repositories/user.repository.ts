import { Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { InjectKysely } from 'nestjs-kysely';
import { columns } from 'src/database';
import { DB } from 'src/db';

@Injectable()
export class UserRepository {
  constructor(@InjectKysely() private db: Kysely<DB>) {}

  async get(userId: string) {
    return this.db
      .selectFrom('users')
      .select(columns.user)
      .where('users.id', '=', userId)
      .executeTakeFirst();
  }
}
