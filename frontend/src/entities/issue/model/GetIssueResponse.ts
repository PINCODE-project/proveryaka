import { IssueStatus } from '@entities/issue/model/IssueStatus';

export type GetIssueResponse = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Название
     */
    name: string | null;

    /**
     * Описание
     */
    description: string | null;

    /**
     * Дедлайн оценивания
     * @example 2024-07-16T05:13:10.807Z
     */
    assessmentDeadlineDateUtc: string | null;

    /**
     * Дедлайн сдачи
     * @example 2024-07-16T05:13:10.807Z
     */
    submitDeadlineDateUtc: string | null;

    /**
     * Ссылка на материалы к заданию
     */
    materialsUrl: string | null;

    /**
     * Минимальное количество проверок
     */
    checksCountMin: number;

    /**
     * Макисмально количество проверок
     */
    checksCountMax: number;

    /**
     * Идентификатор пространства, к котрому привязано задание
     */
    spaceId: string;

    /**
     * Кол-во всех решений по заданию
     */
    allSolutionCount: number;

    /**
     * Оцененные решения которые оценили минимальное кол-во экспертов
     */
    reviewedSolutionCount: number;

    /**
     * Кол-во всех команд в пространстве
     */
    allTeamCountInSpace: number;

    /**
     * ПОЛЕ ФРОНТА: Статус задания
     */
    innerStatus?: IssueStatus;
};
