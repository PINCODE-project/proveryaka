export type CreateIssueDraftRequest = {
    /**
     * Название
     */
    name: string;

    /**
     * Описание
     */
    description: string | null;

    /**
     * Дедлайн оценивания
     */
    assessmentDeadlineDateUtc: string;

    /**
     * Дедлайн сдачи
     */
    submitDeadlineDateUtc: string;

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
    spaceId: string | null;

    /**
     * Флаг используются ли команды в задании
     */
    isUseTeam: boolean;
};
