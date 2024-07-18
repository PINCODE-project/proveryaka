export type GetIssueResponse = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Название
     */
    name: string | null;

    /**
     * Описание
     */
    description: string | null;

    /**
     * Дедлайн оценивания
     * @example 2024-07-16T05:13:10.807Z
     */
    assessmentDeadlineDateUtc: string;

    /**
     * Дедлайн сдачи
     * @example 2024-07-16T05:13:10.807Z
     */
    submitDeadlineDateUtc: string;

    /**
     * Ссылка на материалы к заданию
     */
    materialsUrl: string | null;

    /**
     * Минимальное количество проверок
     */
    checksCountMin: number;

    /**
     * Макисмально количество проверок
     */
    checksCountMax: number;

    /**
     * Идентификатор пространства, к котрому привязано задание
     */
    spaceId: string;
};
