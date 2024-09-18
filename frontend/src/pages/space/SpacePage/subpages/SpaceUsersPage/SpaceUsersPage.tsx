import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';

import { DeleteUserFromSpaceButton } from '@features/space/delete-user-from-space';

import {
    GetOrganizerResponse,
    GetStudentResponse, isOrganizer,
    OrganizerTable,
    StudentTable,
    useGetSpaceOrganizers, useGetSpaceRoles,
    useGetSpaceStudents,
} from '@entities/space';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceUsersPage.module.css';
import { UsersCollapse } from './UsersCollapse';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage() {
    const spaceId = useSpaceId();
    const { data: roles } = useGetSpaceRoles(spaceId ?? '');

    const { data: students } = useGetSpaceStudents(spaceId ?? '');
    const { data: organizers } = useGetSpaceOrganizers(spaceId ?? '');

    const renderActions = useCallback((_: string, record: GetStudentResponse | GetOrganizerResponse) => {
        if (!isOrganizer(roles)) {
            return undefined;
        }

        const items: MenuProps['items'] = [
            {
                key: '1',
                label: 'Изменить роль',
                disabled: true,
            },
            {
                key: '2',
                label: <DeleteUserFromSpaceButton
                    triggerComponent={onDelete => (
                        <Typography.Text onClick={onDelete} className={styles.deleteUser}>
                            Удалить из пространства
                        </Typography.Text>
                    )}
                    spaceId={spaceId ?? ''}
                    userId={record.id}
                />,
                danger: true,
            },
        ];

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, [roles]);

    return (
        <Flex vertical gap={36}>
            <Flex align="center" justify="space-between" gap={16}>
                Filters
            </Flex>

            <UsersCollapse
                users={organizers?.organizerInfoList ?? []}
                usersName="Организаторы"
                content={users => (
                    <OrganizerTable
                        renderActions={renderActions}
                        organizers={users}
                    />
                )}
            />

            <UsersCollapse
                users={students?.studentInfoList ?? []}
                usersName="Студенты"
                content={users => (
                    <StudentTable
                        renderActions={renderActions}
                        students={users}
                    />)}
            />
        </Flex>
    );
});
