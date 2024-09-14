import { TeamEditor } from '@entities/team';

export type EditTeam = Omit<TeamEditor, 'spaceId'> & {
    id: string;
};
