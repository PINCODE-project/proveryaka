import { ListFilters } from '@shared/types';

import { TeamType } from './TeamType';

export type GetTeamFilters = ListFilters & Partial<{
    teamType: TeamType;
    teamSize: number;
    search: string;
}>;
