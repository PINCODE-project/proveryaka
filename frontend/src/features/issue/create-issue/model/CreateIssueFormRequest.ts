export type CreateIssueFormRequest = {
    /**
     * Название поля
     */
    name: string;

    /**
     * Описание
     */
    description: string;

    /**
     * Обязательная ли форма для сдачи
     */
    isRequired: boolean;

    /**
     * Тип формы сдачи
     */
    formSolutionType: number;

    /**
     * ID формы (НА ФРОНТЕ)
     */
    id?: string;
};
