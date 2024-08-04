export type GetSolutionValue = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Содержит само решение. Текстовые формат - текст
     */
    textValue: string | null;

    /**
     * Содержит само решение. Файловый формат - id файла
     */
    fileIdList: string[] | null;

    file?: File | null;

    /**
     * Идентификатор формы задания
     */
    issueFormId: string;
};
