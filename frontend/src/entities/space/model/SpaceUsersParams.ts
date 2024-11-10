import { ListFilters } from '@shared/types';

export type SpaceUsersParams = ListFilters & Partial<{
    search: string;
}>;
