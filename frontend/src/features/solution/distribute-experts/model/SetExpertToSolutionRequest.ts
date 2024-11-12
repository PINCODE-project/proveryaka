export type SetExpertToSolutionRequest = {
    /**
     * Список айди экспертов (профиль)
     */
    expertProfileIdList: string[];

    /**
     * Идентификатор решения
     */
    solutionId: string;
};
