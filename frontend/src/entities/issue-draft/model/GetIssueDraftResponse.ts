import { GetCriteriaDraftResponse } from '@entities/issue-draft/model/GetCriteriaDraftResponse';
import { GetIssueFormDraftResponse } from '@entities/issue-draft/model/GetIssueFormDraftResponse';
import { GetIssueMaterialDraftResponse } from '@entities/issue-draft/model/GetIssueMaterialDraftResponse';

export type GetIssueDraftResponse = {
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
     * Минимальное количество проверок
     */
    checksCountMin: number;

    /**
     * Максимальное количество проверок
     */
    checksCountMax: number;

    /**
     * Идентификатор пространства, к которому привязано задание
     */
    spaceId: string;

    /**
     * Флаг используются ли команды в задании
     */
    isUseTeam: boolean;

    /**
     * Кол-во всех решений по заданию
     */
    materials: GetIssueMaterialDraftResponse[] | null;

    /**
     * Оцененные решения которые оценили минимальное кол-во экспертов
     */
    criteria: GetCriteriaDraftResponse[] | null;

    /**
     * Кол-во всех команд в пространстве
     */
    forms: GetIssueFormDraftResponse[] | null;
};
