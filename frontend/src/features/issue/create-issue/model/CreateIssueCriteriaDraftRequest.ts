import { CreateIssueCriteriaExampleDraftRequest } from './CreateIssueCriteriaExampleDraftRequest';

export type CreateIssueCriteriaDraftRequest = {
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
     * Максимальное количество баллов
     */
    maxScore: number;

    /**
     * Вес критерия
     */
    weight: number;

    /**
     * Примеры критерия
     */
    examples: CreateIssueCriteriaExampleDraftRequest[];

    /**
     * ID критерия (НА ФРОНТЕ)
     */
    id: string;
};
