import { GetReviews } from '@entities/solution/model/GetReviews';

export type GetSolutionReviews = {
    /**
     * Задача
     */
    issueId: string;

    /**
     * Команда
     */
    teamId: string;

    /**
     * Дата сдачи
     */
    submitAtUtc: string;

    /**
     * Оценка решения
     */
    mark: number;

    /**
     * Оценки
     */
    reviews: GetReviews[];
};
