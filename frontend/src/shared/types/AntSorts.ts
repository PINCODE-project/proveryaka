import { TableProps } from 'antd';

export type AntOnChange<TValue> = NonNullable<TableProps<TValue>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
export type AntSorts<TValue> = GetSingle<Parameters<AntOnChange<TValue>>[2]>;
