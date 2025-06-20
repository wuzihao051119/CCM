import { UserTable } from './schema/tables/user.table';

export interface DB {
  users: UserTable;
}
