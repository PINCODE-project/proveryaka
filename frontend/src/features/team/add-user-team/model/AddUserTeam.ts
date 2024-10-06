export type AddUserTeam = {
    /**
     * ID команды
     */
    teamId: string | null;

    /**
     * ID пространства или задания
     */
    entityId: string;

    /**
     * Добавленные участники
     */
    userProfileIdList: string[] | null;
};
