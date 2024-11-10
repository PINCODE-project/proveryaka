export type SetExpertToSolutionRequest = {
    /**
     * Список айди экспертов (профиль)
     */
    expertIdList: string[];

    /**
     * Идентификатор решения
     */
    solutionId: string;
};
