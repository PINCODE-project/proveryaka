import { ListFilters } from '@shared/types';

import { TeamType } from './TeamType';

export type GetTeamFilters = ListFilters & {
    teamType: TeamType;
};
