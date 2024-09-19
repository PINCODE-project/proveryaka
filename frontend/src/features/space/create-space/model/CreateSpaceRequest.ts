import { Space } from '@entities/space';

export type CreateSpaceRequest = Space & {
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
