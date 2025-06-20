import { register } from 'src/sql-tools/from-code/register';

export type UniqueOptions = {
  name?: string;
  columns: string[];
  synchronize?: boolean;
};

export const unique = (options: UniqueOptions): ClassDecorator => {
  return (object: Function) =>
    void register({
      type: 'unique',
      item: { object: object, options: options },
    });
};
