/**
 * Создание ревью по критерию
 */
export type CriteriaReviewByCriteria = {
    /**
     * Критерий оценивания
     */
    criteriaId: string;

    /**
     * Оценка - кол-во баллов по критерия
     */
    scoreCount: number | null;

    /**
     * Необязательный комментарий к оценке по критерию
     */
    comment: string | null;
};
