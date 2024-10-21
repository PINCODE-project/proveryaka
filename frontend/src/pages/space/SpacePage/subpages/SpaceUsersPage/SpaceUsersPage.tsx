import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, Suspense, useCallback } from 'react';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';
import { UpdateRoleModal } from '@features/space/change-user-role';
import { DeleteUserFromSpaceButton } from '@features/space/delete-user-from-space';

import {
    GetOrganizerResponse,
    GetStudentResponse,
    OrganizerTable,
    StudentTable,
    useGetSpaceExperts,
    useGetSpaceOrganizers,
    useGetSpaceStudents,
} from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';
import { useGetCurrentUserInfo } from '@entities/user';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback } from '@shared/ui';

import styles from './SpaceUsersPage.module.css';
import { UsersCollapse } from './UsersCollapse';

export type Props = ClassNameProps & TestProps;

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage() {
    const spaceId = useSpaceId();
    const { isOrganizer } = useRolesCheck();
    const { data: user } = useGetCurrentUserInfo();

    const { data: students } = useGetSpaceStudents(spaceId ?? '');
    const { data: experts } = useGetSpaceExperts(spaceId ?? '');
    const { data: organizers } = useGetSpaceOrganizers(spaceId ?? '');

    const renderActions = useCallback(
        (role: SpaceRoleType) => function renderActions(_: string, record: GetStudentResponse | GetOrganizerResponse) {
            if (!isOrganizer || record.id === user?.id) {
                return undefined;
            }

            const items: MenuProps['items'] = [
                {
                    key: '1',
                    label: <UpdateRoleModal
                        triggerComponent={onOpen => (
                            <Typography.Text className={styles.menuItem} onClick={onOpen}>
                                Изменить роль
                            </Typography.Text>
                        )}
                        userFullName={`${record.surname} ${record.name} ${record.patronymic}`}
                        spaceId={spaceId ?? ''}
                        userId={record.id}
                        spaceRole={role}
                    />,
                },
                {
                    key: '2',
                    label: <DeleteUserFromSpaceButton
                        triggerComponent={onDelete => (
                            <Typography.Text className={styles.menuItem} onClick={onDelete}>
                                Удалить из пространства
                            </Typography.Text>
                        )}
                        userFullName={`${record.surname} ${record.name} ${record.patronymic}`}
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
        }, [isOrganizer, user, spaceId],
    );

    return (
        <Flex vertical gap={36}>
            <Flex align="center" justify="space-between" gap={16}>
                Filters

                {isOrganizer
                    ? <AddUserInSpaceModal
                        spaceId={spaceId ?? ''}
                        triggerComponent={onExit => (
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={onExit}
                            >
                                Добавить участников
                            </Button>
                        )}
                    />
                    : null}
            </Flex>

            <UsersCollapse
                users={organizers?.organizerInfoList ?? []}
                usersName="Организаторы"
                content={users => (
                    <Suspense fallback={<Fallback />}>
                        <OrganizerTable
                            renderActions={renderActions(SpaceRoleType.Organizer)}
                            organizers={users}
                        />
                    </Suspense>
                )}
            />

            <UsersCollapse
                users={experts?.expertsInfoList ?? []}
                usersName="Эксперты"
                content={users => (
                    <Suspense fallback={<Fallback />}>
                        <OrganizerTable
                            renderActions={renderActions(SpaceRoleType.Expert)}
                            organizers={users}
                        />
                    </Suspense>
                )}
            />

            <UsersCollapse
                users={students?.studentInfoList ?? []}
                usersName="Студенты"
                content={users => (
                    <Suspense fallback={<Fallback />}>
                        <StudentTable
                            renderActions={renderActions(SpaceRoleType.Student)}
                            students={users}
                        />
                    </Suspense>)}
            />
        </Flex>
    );
});
