import { IssueMaterialType } from './IssueMaterialType';

export type GetIssueMaterial = {
    /**
     * Id
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
     * Тип
     */
    type: IssueMaterialType;

    /**
     * К какому заданию материал
     */
    issueId: string;

    /**
     * Файл если тип файловый
     */
    fileId: string | null;

    /**
     * Текст
     */
    text: string | null;
};
