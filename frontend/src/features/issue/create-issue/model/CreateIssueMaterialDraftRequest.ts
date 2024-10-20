import { IssueMaterialType } from '@entities/issue/model/IssueMaterialType';

export type CreateIssueMaterialDraftRequest = {
    /**
     * Название
     */
    name: string;

    /**
     * Описание
     */
    description: string;

    /**
     * Тип материала
     */
    type: IssueMaterialType;

    /**
     * Файл
     */
    fileId?: string | null;

    /**
     * Текст
     */
    text?: string | null;

    /**
     * ID материала (ТОЛЬКО НА ФРОНТЕ)
     */
    id: string;

    /**
     * НА ФРОНТЕ
     */
    file: any;
};
