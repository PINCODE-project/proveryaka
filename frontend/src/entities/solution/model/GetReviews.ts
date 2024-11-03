import { GetCriteriaReview } from '@entities/solution/model/GetCriteriaReview';

export type GetReviews = {
    /**
     * Id решения
     */
    solutionId: string;

    /**
     * Кто ставил оценку
     */
    userId: string | null;

    /**
     * Тип оценки
     */
    likeType: number;

    /**
     * Оценка на оценку
     */
    reviewedEntity: number;

    /**
     * Комметарий к оценке
     */
    comment: string | null;

    /**
     * Оценка
     */
    mark: number;

    /**
     * Оценки по критериям
     */
    reviews: GetCriteriaReview[];

    /**
     * Аватарка пользователя
     */
    avatar?: string | null;

    /**
     * ФИО пользователя
     */
    fio?: string | null;
};
