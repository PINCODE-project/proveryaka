/**
 * Создание ревью по критерию
 */
export type CriteriaReviewByCriteria = {
    /**
     * Критерий оценивания
     */
    criteriaId: number;

    /**
     * Оценка - кол-во баллов по критерия
     */
    scoreCount: number;

    /**
     * Необязательный комментарий к оценке по критерию
     */
    comment: string | null;
};
