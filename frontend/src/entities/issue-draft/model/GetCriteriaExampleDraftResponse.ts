export type GetCriteriaExampleDraftResponse = {
    /**
     * Описание эталона или антипримера
     */
    description: string | null;

    /**
     * Ссылка на эталон или антипример
     */
    exampleLink: string | null;

    /**
     * Тип примера
     */
    exampleType: number;

    /**
     * Пример текстовые
     */
    textValue: string | null;

    /**
     * Пример идентификатором файла
     */
    fileIdValue: string | null;

    /**
     * ID примера критерия (НА ФРОНТЕ)
     */
    id: string;
};
