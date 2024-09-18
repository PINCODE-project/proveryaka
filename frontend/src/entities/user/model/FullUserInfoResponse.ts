export type FullUserInfoResponse = {
    /**
     * Идентификатор профиля пользователя
     */
    id: string | null;

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
     * Кастомное поле для статуса пользователя, куда можно написать любую необходимую инфу - доп контакты, время работы и тд
     */
    status: string | null;

    /**
     * Почта
     */
    email: string | null;

    /**
     * Академическая группа студента
     */
    academicGroup: string | null;

    /**
     * Позиция
     */
    position: string | null;

    /**
     * ID аватара
     */
    avatar: string | null;
};
