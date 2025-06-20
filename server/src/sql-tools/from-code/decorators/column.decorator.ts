import { register } from 'src/sql-tools/from-code/register';

export type ColumnOptions = {
  name?: string;
  synchronize?: boolean;
};

export const Column = (options: ColumnOptions): ClassDecorator => {
  return (object: Function) =>
    void register({
      type: 'column',
      item: { object: object, options: options },
    });
};
