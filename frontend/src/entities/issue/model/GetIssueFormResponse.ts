import { FormSolutionType } from '@entities/issue/model/FormSolutionType';

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
     * Обязательная ли форма для сдачи
     */
    isRequired: boolean;

    /**
     * Тип поля
     */
    formSolutionType: FormSolutionType;
};
