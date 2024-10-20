import { FormSolutionType } from './FormSolutionType';

export type GetIssueFormResponse = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Идентификатор задания
     */
    issueId: string;

    /**
     * Название поля
     */
    name: string | null;

    /**
     * Описание
     */
    description?: string | null;

    /**
     * Обязательная ли форма для сдачи
     */
    isRequired: boolean;

    /**
     * Тип поля
     */
    formSolutionType: FormSolutionType;
};
