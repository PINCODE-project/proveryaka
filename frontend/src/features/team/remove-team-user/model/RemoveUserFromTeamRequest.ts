import { TeamType } from '@entities/team';

export type RemoveUserFromTeamRequest = {
    /**
     * Идентификатор команды
     */
    teamId: string;

    /**
     * Идентификатор команды
     */
    entityId: string;

    /**
     * Идентификатор команды
     */
    userId: string;

    /**
     * Тип команды
     */
    teamType: TeamType;
};
