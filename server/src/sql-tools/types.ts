export enum DatabaseConstraintType {
  PRIMARY_KEY = 'primary-key',
  FOREIGN_KEY = 'foreign-key',
  UNIQUE = 'unique',
  CHECK = 'check',
}

export enum DatabaseActionType {
  NO_ACTION = 'NO ACTION',
  RESTRICT = 'RESTRICT',
  CASCADE = 'CASCADE',
  SET_NULL = 'SET NULL',
  SET_DEFAULT = 'SET DEFAULT',
}

export type ColumnStorage = 'default' | 'external' | 'extended' | 'main';

export type ColumnType =
  | 'bigint'
  | 'boolean'
  | 'bytea'
  | 'character varying'
  | 'character'
  | 'date'
  | 'double precision'
  | 'integer'
  | 'jsonb'
  | 'polygon'
  | 'text'
  | 'time'
  | 'time with time zone'
  | 'time without time zone'
  | 'timestamp'
  | 'timestamp with time zone'
  | 'timestamp without time zone'
  | 'uuid'
  | 'vector'
  | 'enum'
  | 'serial';

export type DatabaseSchema = {
  name: string;
  schemaName: string;
  functions: DatabaseFunction[];
  enums: DatabaseEnum[];
  tables: DatabaseTable[];
  extensions: DatabaseExtension[];
  parameters: DatabaseParameter[];
  warnings: string[];
};

export type SchemaDiffOptions = {
  tables?: DiffOptions;
  functions?: DiffOptions;
  enums?: DiffOptions;
  extension?: DiffOptions;
  parameter?: DiffOptions;
};

export type DiffOptions = {
  ignoreExtra?: boolean;
  ignoreMissing?: boolean;
};

export type DatabaseFunction = {
  name: string;
  expression: string;
  synchronize: boolean;
};

export type DatabaseEnum = {
  name: string;
  values: string[];
  synchronize: boolean;
};

export type DatabaseTable = {
  name: string;
  columns: DatabaseColumn[];
  indexes: DatabaseIndex[];
  constraints: DatabaseConstraint[];
  triggers: DatabaseTrigger[];
  synchronize: boolean;
};

export type DatabaseExtension = {
  name: string;
  synchronize: boolean;
};

export type DatabaseParameter = {
  name: string;
  databaseName: string;
  value: string | number | null | undefined;
  scope: ParameterScope;
  synchronize: boolean;
};

export type ParameterScope = 'database' | 'user';

export type DatabaseColumn = {
  primary?: boolean;
  name: string;
  tableName: string;
  comment?: string;

  type: ColumnType;
  nullable: boolean;
  isArray: boolean;
  synchronize: boolean;

  default?: string;
  length?: number;
  storage?: ColumnStorage;
  identity?: boolean;

  enumName?: string;

  numericPrecision?: number;
  numericScale?: number;
};

export type ColumnChanges = {
  nullable?: boolean;
  default?: string;
  comment?: string;
  storage?: ColumnStorage;
};

export type DatabaseIndex = {
  name: string;
  tableName: string;
  columnNames?: string[];
  expression?: string;
  unique: boolean;
  using?: string;
  with?: string;
  where?: string;
  synchronize: boolean;
};

export type ColumnBasedConstraint = {
  name: string;
  tableName: string;
  columnNames: string[];
};

export type DatabasePrimaryKeyConstraint = ColumnBasedConstraint & {
  type: DatabaseConstraintType.PRIMARY_KEY;
  synchronize: boolean;
};

export type DatabaseForeignKeyConstraint = ColumnBasedConstraint & {
  type: DatabaseConstraintType.FOREIGN_KEY;
  referenceTableName: string;
  referenceColumnNames: string[];
  onUpdate?: DatabaseActionType;
  onDelete?: DatabaseActionType;
  synchronize: boolean;
};

export type DatabaseUniqueConstraint = ColumnBasedConstraint & {
  type: DatabaseConstraintType.UNIQUE;
  synchronize: boolean;
};

export type DatabaseCheckConstraint = {
  type: DatabaseConstraintType.CHECK;
  name: string;
  tableName: string;
  expression: string;
  synchronize: boolean;
};

export type DatabaseConstraint =
  | DatabasePrimaryKeyConstraint
  | DatabaseForeignKeyConstraint
  | DatabaseUniqueConstraint
  | DatabaseCheckConstraint;

export type DatabaseTrigger = {
  name: string;
  tableName: string;
  timing: TriggerTiming;
  actions: TriggerAction[];
  scope: TriggerScope;
  referencingNewTableAs?: string;
  referencingOldTableAs?: string;
  when?: string;
  functionName: string;
  synchronize: boolean;
};

export type TriggerTiming = 'before' | 'after' | 'instead of';
export type TriggerAction = 'insert' | 'update' | 'delete' | 'truncate';
export type TriggerScope = 'row' | 'statement';

export type LoadSchemaOptions = {
  schemaName?: string;
};

export type SchemaDiffToSqlOptions = {
  comments?: boolean;
};

export type SchemaDiff = { reason: string } & (
  | { type: 'extension.create'; extension: DatabaseExtension }
  | { type: 'extension.drop'; extensionName: string }
  | { type: 'function.create'; function: DatabaseFunction }
  | { type: 'function.drop'; functionName: string }
  | { type: 'table.create'; table: DatabaseTable }
  | { type: 'table.drop'; tableName: string }
  | { type: 'column.add'; column: DatabaseColumn }
  | {
      type: 'column.alter';
      tableName: string;
      columnName: string;
      changes: ColumnChanges;
    }
  | { type: 'column.drop'; tableName: string; columnName: string }
  | { type: 'constraint.add'; constraint: DatabaseConstraint }
  | { type: 'constraint.drop'; tableName: string; constraintName: string }
  | { type: 'index.create'; index: DatabaseIndex }
  | { type: 'index.drop'; indexName: string }
  | { type: 'trigger.create'; trigger: DatabaseTrigger }
  | { type: 'trigger.drop'; tableName: string; triggerName: string }
  | { type: 'parameter.set'; parameter: DatabaseParameter }
  | { type: 'parameter.reset'; databaseName: string; parameterName: string }
  | { type: 'enum.create'; enum: DatabaseEnum }
  | { type: 'enum.drop'; enumName: string }
);

export type CompareFunction<T> = (source: T, target: T) => SchemaDiff[];
export type Comparer<T> = {
  onMissing: (source: T) => SchemaDiff[];
  onExtra: (target: T) => SchemaDiff[];
  onCompare: CompareFunction<T>;
};

export enum Reason {
  MissingInSource = 'missing in source',
  MissingInTarget = 'missing in target',
}
