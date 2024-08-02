export type GetCriteriaReview = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Айди общего ревью
     */
    reviewId: string;

    /**
     * Критерий оценивания
     */
    criteriaId: string;

    /**
     * Оценка - кол-во баллов по критерию
     */
    scoreCount: number;

    /**
     * Необязательный комментарий к оценке по критерию
     */
    comment: string | null;

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
};
