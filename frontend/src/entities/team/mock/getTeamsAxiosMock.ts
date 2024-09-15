import { AxiosMockOptions } from '@shared/mock/axios';

import { GetTeamList } from '../model/GetTeamList';

export function getTeamsAxiosMock(): AxiosMockOptions<GetTeamList>[] {
    return [
        {
            path: 'team/list',
            method: 'GET',
            reply: {
                statusOrCallback: 200,
                data: {
                    teamList: [
                        {
                            id: '1',
                            name: 'Team 1',
                            studentInfoList: [
                                {
                                    id: '1',
                                    name: 'Ivan',
                                    surname: 'Ivanov',
                                    patronymic: 'Ivanovich',
                                    status: '',
                                    email: 'test@test.test',
                                    academicGroup: '000000',
                                },
                            ],
                        },
                    ],
                },
            },
        },
    ];
};
