import { ErrorResponse } from '@shared/types';

export function isErrorResponse<TData>(data: ErrorResponse | TData): data is ErrorResponse {
    return (data as ErrorResponse).code !== undefined && (data as ErrorResponse).message !== undefined;
}
