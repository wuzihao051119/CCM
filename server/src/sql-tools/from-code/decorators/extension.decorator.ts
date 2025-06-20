import { register } from 'src/sql-tools/from-code/register';

export type ExtensionOptions = {
  name: string;
  synchronize?: boolean;
};

export const Extension = (options: ExtensionOptions): ClassDecorator => {
  return (object: Function) =>
    void register({
      type: 'extension',
      item: { object: object, options: options },
    });
};
