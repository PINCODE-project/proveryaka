import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';

export type Space = {
    id?: string;

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
    iconFileId: string | null;

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
