import { DatabaseOptions } from './decorators/database.decorator';
import { TableOptions } from './decorators/table.decorator';
import { ColumnOptions } from './decorators/column.decorator';
import { IndexOptions } from './decorators/index.decorator';
import { TriggerOptions } from './decorators/trigger.decorator';

export type ClassBased<T> = { object: Function } & T;
export type RegisterItem =
  | { type: 'database'; item: ClassBased<{ options: DatabaseOptions }> }
  | { type: 'table'; item: ClassBased<{ options: TableOptions }> }
  | { type: 'column'; item: ClassBased<{ options: ColumnOptions }> }
  | { type: 'index'; item: ClassBased<{ options: IndexOptions }> }
  | { type: 'trigger'; item: ClassBased<{ options: TriggerOptions }> };
