import { ListFilters } from '@shared/types';

export type GetSpacesFilters = ListFilters & {
    search: string;
    authorIdList: string[];
};
