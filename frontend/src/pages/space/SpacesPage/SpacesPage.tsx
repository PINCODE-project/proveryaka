import { EllipsisOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback, useMemo } from 'react';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { CreateSpaceModal } from '@features/space/create-space';
import { DeleteSpaceButton } from '@features/space/delete-space';
import { EnterSpaceByCodeModal } from '@features/space/enter-space-by-code';
import { ExitUserButton } from '@features/space/exit-user';

import { SpacesTable } from '@entities/space';
import { GetSpaceResponse } from '@entities/space/model/GetSpaceResponse';
import { useGetUserIsOrganizer } from '@entities/user';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpacesPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpacesPage: FC<Props> = typedMemo(function SpacesPage({
    className,
}) {
    const { data: isOrganizer } = useGetUserIsOrganizer();

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
                label: <ExitUserButton
                    spaceId={record.id}
                    triggerComponent={onExit => (
                        <Typography.Text onClick={onExit}>
                            Покинуть пространство
                        </Typography.Text>
                    )}
                />,
            },
            {
                key: '6',
                label: <DeleteSpaceButton
                    spaceId={record.id}
                    triggerComponent={onDelete => (
                        <Typography.Text onClick={onDelete} className={styles.dangerMenuItem}>
                            Удалить пространство
                        </Typography.Text>)}
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
    }, []);

    const SpacesButton = useMemo(() => {
        if (!isOrganizer) {
            return (
                <EnterSpaceByCodeModal
                    triggerComponent={onOpen => (
                        <Button type="default" icon={<UsergroupAddOutlined />} onClick={onOpen}>
                            Присоединиться к пространству
                        </Button>
                    )}
                />
            );
        }

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
    }, [isOrganizer]);

    return (
        <Flex
            vertical
            gap="large"
            className={getModuleClasses(styles, 'root', null, className)}
        >
            <Flex justify="space-between" gap="middle">
                <Logo />
                <Typography.Text>
                    <UserPanel />
                </Typography.Text>
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Typography.Text>Filters</Typography.Text>
                {SpacesButton}
            </Flex>

            <SpacesTable renderActions={renderActions} />
        </Flex>
    );
});
