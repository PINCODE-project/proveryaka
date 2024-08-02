export type CreateDistribution = {
    /**
     * Список проверяющиз задания, должен быть больше чем CheckCountMax
     */
    expertProfileIdList: string[] | null;

    /**
     * На какой задание делаем распределение
     */
    issueId: string | null;
};
