export type CreateCriteriaRequest = {
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
    issueId: string | null;
};
