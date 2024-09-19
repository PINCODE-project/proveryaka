import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';

export type UpdateRoleToUserInSpace = {
    /**
     * Идентификатор пространства
     */
    spaceId: string;

    /**
     * Идентификатор профиля пользователя
     */
    userId: string;

    /**
     * Роль
     */
    spaceRoleType: SpaceRoleType;
};
