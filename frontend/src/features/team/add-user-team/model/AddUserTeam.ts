export type AddUserTeam = {
    /**
     * Id команды
     */
    teamId: string | null;

    /**
     * Добавленные участники
     */
    userProfileIdList: string[] | null;
};
