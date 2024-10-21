export type GetExpertResponse = {
    /**
     * Идентификатор профиля пользователя
     */
    id: string;

    /**
     * Имя
     */
    name: string | null;

    /**
     * Фамилия
     */
    surname: string | null;

    /**
     * Отчество
     */
    patronymic: string | null;

    /**
     * Кастомное поле для статуса пользователя,
     * куда можно написать любую необходимую инфу - доп контакты, время работы и тд
     */
    status: string | null;

    /**
     * Почта
     */
    email: string | null;

    /**
     * Позиция
     */
    position: string | null;

    /**
     * ID аватарки
     */
    avatar: string | null;
};

export type GetExpertsListResponse = {
    /**
     * Список информации об экспертах в пространстве
     */
    expertsInfoList: GetExpertResponse[] | null;
};
