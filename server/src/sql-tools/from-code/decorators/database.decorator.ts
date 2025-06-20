import { register } from 'src/sql-tools/from-code/register';

export type DatabaseOptions = {
  name?: string;
  synchronize?: boolean;
};

export const Database = (options: DatabaseOptions): ClassDecorator => {
  return (object: Function) =>
    void register({ type: 'database', item: { object, options } });
};
