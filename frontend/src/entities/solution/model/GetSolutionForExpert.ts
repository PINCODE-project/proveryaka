import { Status } from '@entities/issue';

import { GetSolutionValue } from './GetSolutionValue';

export type GetSolutionForExpert = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Задача
     */
    issueId: string;

    /**
     * Сами решения
     */
    solutionValueList: GetSolutionValue[];

    /**
     * Дедлайн сдачи
     */
    submitAtUtc: string;

    /**
     * Оценка решения
     */
    mark: number;

    /**
     * Навание задачи
     */
    issueName: string | null;

    /**
     * Количество проверок
     */
    reviewCount: number;

    /**
     * Максимальное количество проверок
     */
    checksCountMax: number;

    assessmentDeadlineDateUtc: string;

    status?: Status;

    authorId: string;

    authorName: string;
};
