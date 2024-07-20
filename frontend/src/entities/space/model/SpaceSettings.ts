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
     * Идентификаторы организаторов
     */
    organizerId: string[] | null;

    /**
     * Пригласительный код
     */
    inviteCode?: string;
};
