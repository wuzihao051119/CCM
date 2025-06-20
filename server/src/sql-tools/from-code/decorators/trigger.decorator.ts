import { register } from 'src/sql-tools/from-code/register';

export type TriggerOptions = {
  name?: string;
  synchronize?: boolean;
};

export const Trigger = (options: TriggerOptions): ClassDecorator => {
  return (object: Function) =>
    void register({
      type: 'trigger',
      item: { object: object, options: options },
    });
};
