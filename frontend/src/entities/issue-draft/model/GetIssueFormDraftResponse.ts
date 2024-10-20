export type GetIssueFormDraftResponse = {
    /**
     * Название
     */
    name: string | null;

    /**
     * Обязательная ли форма для сдачи
     */
    isRequired: boolean | null;

    /**
     * Тип
     */
    formSolutionType: number;

    /**
     * Описание
     */
    description: string | null;

    /**
     * ID формы (ТОЛЬКО НА ФРОНТЕ)
     */
    id: string;
};
