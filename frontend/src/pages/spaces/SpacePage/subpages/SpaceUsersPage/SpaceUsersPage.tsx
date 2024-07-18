import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { FC, useMemo, useState } from 'react';

import { TaskCard, TaskStatus, UserTable } from '@entities/space';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, NavTab, Text } from '@shared/ui';

import styles from './SpaceUsersPage.module.css';

const getItems = (orgCount: number, expertCount: number, studentCount: number): CollapseProps['items'] => [
    {
        key: '1',
        label: <Text className={getBemClasses(styles, 'collapseLabel')}>
            Владельцы ({orgCount})
        </Text>,
        children: <UserTable />,
    },
    {
        key: '2',
        label: <Text className={getBemClasses(styles, 'collapseLabel')}>
            Эксперты ({expertCount})
        </Text>,
        children: <UserTable />,
    },
    {
        key: '3',
        label: <Text className={getBemClasses(styles, 'collapseLabel')}>
            Студенты ({studentCount})
        </Text>,
        children: <UserTable />,
    },
];

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage({
    className,
}) {
    const items = useMemo(() => getItems(1, 1, 1), []);

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
