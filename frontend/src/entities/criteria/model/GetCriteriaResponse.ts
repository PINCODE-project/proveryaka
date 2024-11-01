export type GetCriteriaResponse = {
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
     * Минимальное количество баллов
     */
    minScore: number;

    /**
     * Максимально количество баллов
     */
    maxScore: number;

    /**
     * Вес критерия
     */
    weight: number;

    /**
     * Идентификатор задания
     */
    issueId: string;
};
