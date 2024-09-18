import { TeamEditor, TeamType } from '@entities/team';

export type CreateTeam = TeamEditor & {
    teamType: TeamType;
    userProfileIdList: string[];
};
