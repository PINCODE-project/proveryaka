import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

export type GetSolution = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Задача
     */
    issueId: string;

    /**
     * Команда
     */
    teamId: string;

    /**
     * Сами решения
     */
    solutionValueList: GetSolutionValue[] | null;

    /**
     * Дедлайн сдачи
     */
    submitAtUtc: string;

    /**
     * Оценка решения
     */
    mark: number;
};
