import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';

import { SpacesTable } from '@entities/space';
import { GetSpaceResponse } from '@entities/space/model/GetSpaceResponse';

import Logo from '@shared/assets/images/logo.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpacesPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpacesPage: FC<Props> = typedMemo(function SpacesPage({
    className,
}) {
    const renderActions = useCallback((_: string, record: GetSpaceResponse) => {
        const items: MenuProps['items'] = [
            {
                key: '1',
                label: 'Изменить пространство',
                disabled: true,
            },
            {
                key: '2',
                label: 'Добавить участников',
                disabled: true,
            },
            {
                key: '3',
                label: 'Скопировать код',
                disabled: true,
            },
            {
                key: '4',
                label: 'Перегенерировать код',
                disabled: true,
            },
            {
                key: '5',
                label: 'Покинуть пространство',
                disabled: true,
            },
            {
                key: '6',
                label: 'Удалить пространство',
                danger: true,
                disabled: true,
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

    return (
        <Flex
            vertical
            gap="large"
            className={getBemClasses(styles, 'root', null, className)}
        >
            <Flex justify="space-between" gap="middle">
                <Logo />

                <Typography.Text>User</Typography.Text>
            </Flex>

            <Typography.Text>Filters</Typography.Text>

            <SpacesTable renderActions={renderActions} />
        </Flex>
    );
});
