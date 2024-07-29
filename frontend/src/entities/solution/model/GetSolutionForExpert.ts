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
     * Команда
     */
    teamId: string;

    /**
     * Сами решения
     */
    solutionValueList: GetSolutionValue[];

    /**
     * Дата сдачи
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
};
