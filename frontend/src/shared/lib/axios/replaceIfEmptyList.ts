import { GetListResponse } from '@shared/types';

export function replaceIfEmptyList<T>(placeholder: T[]) {
    return function(data: GetListResponse<T | null>): GetListResponse<T> {
        if (!data.entityList) {
            return { entityList: placeholder };
        }

        return data as GetListResponse<T>;
    };
}
