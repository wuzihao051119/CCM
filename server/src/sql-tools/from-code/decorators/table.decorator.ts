import { register } from 'src/sql-tools/from-code/register';

export type TableOptions = {
  name?: string;
  primaryConstraintName?: string;
  synchronize?: boolean;
};

export const Table = (options: TableOptions): ClassDecorator => {
  return (object: Function) =>
    void register({ type: 'table', item: { object, options } });
};
