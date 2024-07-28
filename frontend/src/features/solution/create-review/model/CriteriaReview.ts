import { CriteriaReviewByCriteria } from './CriteriaReviewByCriteria';

export type CriteriaReview = {
    /**
     * Id проверенного решения
     */
    solutionId: string;

    // likeType

    /**
     * Комметарий к оценке
     */
    comment: string | null;

    /**
     * Ревью по критериям
     */
    reviewsByCriteria: CriteriaReviewByCriteria[];
};
