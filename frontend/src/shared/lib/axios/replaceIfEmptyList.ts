import { GetListResponse } from '@shared/types';

export function replaceIfEmptyList<T>(placeholder: T[]) {
    return function(data: GetListResponse<T | null>) {
        if (!data.entityList) {
            return placeholder;
        }

        return data;
    };
}
