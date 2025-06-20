import { DatabaseOptions } from 'src/sql-tools/from-code/decorators/database.decorator';
import { TableOptions } from 'src/sql-tools/from-code/decorators/table.decorator';
import { ColumnOptions } from 'src/sql-tools/from-code/decorators/column.decorator';
import { IndexOptions } from 'src/sql-tools/from-code/decorators/index.decorator';
import { TriggerOptions } from 'src/sql-tools/from-code/decorators/trigger.decorator';
import { UniqueOptions } from 'src/sql-tools/from-code/decorators/unique.decorator';
import { ExtensionOptions } from 'src/sql-tools/from-code/decorators/extension.decorator';
import { DatabaseEnum, DatabaseFunction } from 'src/sql-tools/types';

export type ClassBased<T> = { object: Function } & T;
export type PropertyBased<T> = {
  object: object;
  propertyName: string | symbol;
} & T;
export type RegisterItem =
  | { type: 'database'; item: ClassBased<{ options: DatabaseOptions }> }
  | { type: 'table'; item: ClassBased<{ options: TableOptions }> }
  | { type: 'column'; item: PropertyBased<{ options: ColumnOptions }> }
  | { type: 'index'; item: ClassBased<{ options: IndexOptions }> }
  | { type: 'trigger'; item: ClassBased<{ options: TriggerOptions }> }
  | { type: 'unique'; item: ClassBased<{ options: UniqueOptions }> }
  | { type: 'extension'; item: ClassBased<{ options: ExtensionOptions }> }
  | { type: 'enum'; item: DatabaseEnum }
  | { type: 'function'; item: DatabaseFunction };
