import { CollapseProps, Dropdown, MenuProps, TableProps, Collapse } from 'antd';
import { FC, useMemo } from 'react';

import { ChangeSpaceUserRole } from '@features/space/edit-space/sub-features/change-user-role';

import { UserTable, useGetSpaceExperts, useGetSpaceOrganizers, useGetSpaceStudents } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { User } from '@entities/space/ui/UserTable/UserTable';

import ThreeDots from '@shared/assets/icons/ThreeDots.svg';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './SpaceUsersPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: <ChangeSpaceUserRole
            triggerComponent={open => (<Text onClick={open}>
                Изменить роль
            </Text>)}
            username={'User Name'}
        />,
    },
    {
        key: '2',
        label: 'Удалить из пространства',
    },
];

const actions: TableProps<User>['columns'] = [
    {
        title: '',
        className: getBemClasses(styles, 'columns'),
        render: (_, record) => (
            <Dropdown menu={{ items }}>
                <ThreeDots />
            </Dropdown>
        ),
    },
];

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage({
    className,
}) {
    const spaceId = useSpaceId();

    const { data: organizers } = useGetSpaceOrganizers(spaceId ?? '');
    const { data: experts } = useGetSpaceExperts(spaceId ?? '');
    const { data: students } = useGetSpaceStudents(spaceId ?? '');
    const { isOrganizer, isStudent } = useRolesCheck();

    const items = useMemo<CollapseProps['items']>(() => {
        const items: CollapseProps['items'] = [
            {
                key: '1',
                label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                    Владельцы ({(organizers?.organizerInfoList ?? []).length})
                </Text>,
                collapsible: (organizers?.organizerInfoList ?? []).length > 0 ? undefined : 'disabled',
                children: <UserTable users={organizers?.organizerInfoList ?? []}
                    actions={isOrganizer ? actions : undefined}
                />,
            },
        ];

        if (isOrganizer) {
            items.push({
                key: '2',
                collapsible: (experts?.expertsInfoList ?? []).length > 0 ? undefined : 'disabled',
                label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                        Эксперты ({(experts?.expertsInfoList ?? []).length})
                </Text>,
                children: <UserTable users={experts?.expertsInfoList ?? []}
                    actions={isOrganizer ? actions : undefined}
                />,
            });
        }

        items.push({
            key: '3',
            collapsible: (students?.studentInfoList ?? []).length > 0 ? undefined : 'disabled',
            label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                Студенты ({(students?.studentInfoList ?? []).length})
            </Text>,
            children: <UserTable users={students?.studentInfoList ?? []} isStudent={true}
                actions={isOrganizer ? actions : undefined}
            />,
        });

        return items;
    }, [organizers, experts, students]);

    return (
        <FlexContainer
            direction="column"
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
        >
            <Collapse
                defaultActiveKey={['1']}
                ghost
                className={getBemClasses(styles, 'collapse')}
                items={items}
            />
        </FlexContainer>
    );
});
