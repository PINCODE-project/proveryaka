/**
 * Запрос на регистрацию пользователя
 */
export type SignUp = {
    /**
     * Имя пользователя
     */
    name: string | null;

    /**
     * Фамилия пользователя
     */
    surname: string | null;

    /**
     * Отчество пользователя
     */
    patronymic: string | null;

    /**
     * Почта
     */
    email: string | null;

    /**
     * Телефон в формате 79000000000
     */
    phone: string | null;

    /**
     * Аватар пользователя. Поле хранит id файла аватара
     */
    avatar?: string | null;

    /**
     * Пароль
     */
    password: string | null;
};
