import { GetStudentResponse } from '@entities/space';

export type GetTeam = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Название команды
     */
    name: string | null;

    /**
     *  Список информации студентов в команде
     */
    studentInfoList: GetStudentResponse[] | null;
};
