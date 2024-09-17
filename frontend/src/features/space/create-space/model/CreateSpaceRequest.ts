import { SpaceSettings } from '@entities/space';

export type CreateSpaceRequest = SpaceSettings & {
    /**
     * Создать настройки пространтсва
     */
    spaceSettings: {
        /**
         * Используются ли команды в пространстве
         */
        isUseTeam: true;
    };
};
