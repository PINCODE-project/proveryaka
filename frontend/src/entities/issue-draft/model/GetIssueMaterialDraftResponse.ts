export type GetIssueMaterialDraftResponse = {
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
    type: number;

    /**
     * Файл
     */
    fileId: string;

    /**
     * Тип
     */
    text: string;

    /**
     * ID материала (НА ФРОНТЕ)
     */
    id: string;
};
