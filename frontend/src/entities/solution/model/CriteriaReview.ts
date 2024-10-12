export type CriteriaReview = {
    /**
     * Название
     */
    name: string | null;

    /**
     * Максимально количество баллов
     */
    maxScore: number;

    /**
     * Оценка - кол-во баллов по критерию
     */
    scoreCount: number;

    /**
     * Необязательный комментарий к оценке по критерию
     */
    comment: string | null;

    /**
     * Кол-во дальше идущих записей с таким же критерием
     */
    count?: number;
};
