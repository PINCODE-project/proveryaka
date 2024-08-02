export type AddUserToSpaceRequest = {
    /**
     * Список идентификаторов пользователей, которых хотим добавить в пространство
     */
    userProfileIdList: string[] | null;

    /**
     * Роль пользователей
     */
    spaceRoleType: number | null;

    /**
     *  Идентификатор пространства в которое добавляем пользователей
     */
    spaceId: string;
};
