import { Table } from 'src/sql-tools/from-code/decorators/table.decorator';

@Table({ name: 'users', primaryConstraintName: '' })
export class UserTable {
  id!: string;
  name!: string;
  email!: string;
}
