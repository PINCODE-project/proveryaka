import { EllipsisOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { FC, useCallback, useMemo } from 'react';

import { CreateSpaceModal } from '@features/space/create-space';
import { EnterSpaceByCodeModal } from '@features/space/enter-space-by-code';

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

    const SpacesButton = useMemo(() => {
        const items: MenuProps['items'] = [
            {
                key: '1',
                label: <CreateSpaceModal
                    triggerComponent={onOpen => (
                        <Typography.Text onClick={onOpen}>Создать пространство</Typography.Text>
                    )}
                />,
            },
            {
                key: '2',
                label: <EnterSpaceByCodeModal
                    triggerComponent={onOpen => (
                        <Typography.Text onClick={onOpen}>Присоединиться к пространству</Typography.Text>
                    )}
                />,
            },
        ];

        return (
            <Dropdown menu={{ items }}>
                <Button type="default" icon={<UsergroupAddOutlined />}>
                    Создать или присоединиться к пространству
                </Button>
            </Dropdown>
        );
    }, []);

    return (
        <Flex
            vertical
            gap="large"
            className={getBemClasses(styles, 'root', null, className)}
        >
            <Flex justify="space-between" gap="middle" align="center">
                <Logo />

                <Typography.Text>User</Typography.Text>
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Typography.Text>Filters</Typography.Text>
                {SpacesButton}
            </Flex>

            <SpacesTable renderActions={renderActions} />
        </Flex>
    );
});
