import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { FC, useMemo } from 'react';

import { UserTable, useGetSpaceExperts, useGetSpaceOrganizers, useGetSpaceStudents } from '@entities/space';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './SpaceUsersPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage({
    className,
}) {
    const spaceId = useSpaceId();

    const { data: organizers } = useGetSpaceOrganizers(spaceId ?? '');
    const { data: experts } = useGetSpaceExperts(spaceId ?? '');
    const { data: students } = useGetSpaceStudents(spaceId ?? '');

    const items = useMemo<CollapseProps['items']>(() => [
        {
            key: '1',
            label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                Владельцы ({(organizers?.organizerInfoList ?? []).length})
            </Text>,
            collapsible: (organizers?.organizerInfoList ?? []).length > 0 ? undefined : 'disabled',
            children: <UserTable users={organizers?.organizerInfoList ?? []} />,
        },
        {
            key: '2',
            collapsible: (experts?.expertInfoList ?? []).length > 0 ? undefined : 'disabled',
            label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                Эксперты ({(experts?.expertInfoList ?? []).length})
            </Text>,
            children: <UserTable users={experts?.expertInfoList ?? []} />,
        },
        {
            key: '3',
            collapsible: (students?.studentInfoList ?? []).length > 0 ? undefined : 'disabled',
            label: <Text className={getBemClasses(styles, 'collapseLabel')}>
                Студенты ({(students?.studentInfoList ?? []).length})
            </Text>,
            children: <UserTable users={students?.studentInfoList ?? []} isStudent={true} />,
        },
    ], [organizers, experts, students]);

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
