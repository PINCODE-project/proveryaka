import { CriteriaReviewByCriteria } from './CriteriaReviewByCriteria';

export type CriteriaReview = {
    /**
     * Id проверенного решения
     */
    solutionId: string;

    /**
     * Тип лайка
     */
    likeType: number;

    /**
     * Комметарий к оценке
     */
    comment: string | null;

    /**
     * Ревью по критериям
     */
    reviewsByCriteria: CriteriaReviewByCriteria[];
};
