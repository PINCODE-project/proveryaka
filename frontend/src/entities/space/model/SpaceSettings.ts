import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';

export type SpaceSettings = {
    /**
     * Название
     */
    name: string | null;

    /**
     * Описание
     */
    description: string | null;

    /**
     * Ссылка на иконку
     */
    icon: string | null;

    /**
     * Тип доступа
     */
    accessType: SpaceAccessType;

    /**
     * Пригласительный код. Активен при типе доступности пространства - Public или Private.
     */
    inviteCode: string | null;

    /**
     * Идентификаторы организаторов
     */
    organizerId: string[] | null;
};
