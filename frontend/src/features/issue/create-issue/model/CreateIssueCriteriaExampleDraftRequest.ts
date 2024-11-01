export type CreateIssueCriteriaExampleDraftRequest = {
    /**
     * Описание
     */
    description: string;

    /**
     * Тип примеров для критериев и заданий
     */
    exampleType: number;

    /**
     * Пример идентификатором файла
     */
    fileIdValue: string;

    /**
     * ID примера критерия (НА ФРОНТЕ)
     */
    id: string;

    /**
     * Файл (НА ФРОНТЕ)
     */
    file: any;
};
