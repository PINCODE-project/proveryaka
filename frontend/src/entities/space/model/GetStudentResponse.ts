export type GetStudentResponse = {
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
     * Академическая группа студента
     */
    academicGroup: string | null;

    /**
     * ID аватарки
     */
    avatar: string | null;
};

export type GetStudentListResponse = {
    /**
     * Список информации об студентах в пространстве
     */
    studentInfoList: GetStudentResponse[] | null;
};
