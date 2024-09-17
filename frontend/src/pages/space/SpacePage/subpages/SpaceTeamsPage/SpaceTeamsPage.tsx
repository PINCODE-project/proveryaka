import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { TeamsTable, GetTeam } from '@entities/team';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceTeamsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTeamsPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,

}) {
    const spaceId = useSpaceId();

    const renderActions = useCallback((_: string, record: GetTeam) => {
        const items: MenuProps['items'] = [
            {
                key: '1',
                label: 'Изменить команду',
                disabled: true,
            },
            {
                key: '2',
                label: 'Покинуть команду',
                disabled: true,
            },
            {
                key: '3',
                label: 'Удалить команду',
                disabled: true,
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
    }, []);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex gap={28} vertical className={ className}>
            <Typography.Text>
                Filters
            </Typography.Text>
            <TeamsTable spaceId={spaceId} actionRender={renderActions} />
        </Flex>
    );
});
