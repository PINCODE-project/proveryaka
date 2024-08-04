import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

export type CreateSolution = {
    /**
     * Задача
     */
    issueId: string;

    /**
     * Команда
     */
    teamId: string;

    /**
     * Список решений пользователя на форме
     */
    solutionValueList: Omit<GetSolutionValue, 'id'>[] | null;
};
