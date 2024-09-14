import { SpaceAccessType } from './SpaceAccessType';

/**
 * Получение пространства
 */
export type GetSpaceResponse = {
    /**
     * Идентификатор сущности
     */
    id: string;

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
    organizerIdList: string[] | null;
};
