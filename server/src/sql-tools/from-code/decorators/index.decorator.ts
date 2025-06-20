import { register } from 'src/sql-tools/from-code/register';

export type IndexOptions = {
  name?: string;
  unique?: boolean;
  synchronize?: boolean;
};

export const Index = (options: IndexOptions): ClassDecorator => {
  return (object: Function) =>
    void register({
      type: 'index',
      item: { object: object, options: options },
    });
};
