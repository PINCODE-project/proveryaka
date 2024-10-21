import { GetCriteriaExampleDraftResponse } from '@entities/issue-draft/model/GetCriteriaExampleDraftResponse';

export type GetCriteriaDraftResponse = {
    /**
     * Название
     */
    name: string;

    /**
     * Описание
     */
    description: string;

    /**
     * Минимальное количество баллов
     */
    minScore: number;

    /**
     * Максимально количество баллов
     */
    maxScore: number;

    /**
     * Тип
     */
    weight: number;

    /**
     * Примеры критерия
     */
    examples: GetCriteriaExampleDraftResponse[];

    /**
     * ID критерия (НА ФРОНТЕ)
     */
    id: string;
};
