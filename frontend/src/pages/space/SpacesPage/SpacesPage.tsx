import { EllipsisOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { App, Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';
import { CreateSpaceModal } from '@features/space/create-space';
import { DeleteSpaceButton } from '@features/space/delete-space';
import { EditSpaceModal } from '@features/space/edit-space';
import { EnterSpaceByCodeModal } from '@features/space/enter-space-by-code';
import { ExitUserButton } from '@features/space/exit-user';
import { useCopySpaceCode, useRegenerateSpaceCode } from '@features/space/get-space-code';

import { SpacesTable } from '@entities/space';
import { GetSpaceResponse } from '@entities/space/model/GetSpaceResponse';
import { useGetUserIsOrganizer } from '@entities/user';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpacesPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpacesPage: FC<Props> = typedMemo(function SpacesPage({
    className,
}) {
    const { notification } = App.useApp();

    const { data: isOrganizer } = useGetUserIsOrganizer();

    const { mutate: copyCode } = useCopySpaceCode({
        onSuccess: (_, context) => {
            notification.success({
                message: 'Скопировать код',
                description: <>Код пространства <b>{context.name}</b> скопирован</>,
            });
        },
    });
    const { mutate: regenerateCode } = useRegenerateSpaceCode({
        onSuccess: (_, context) => {
            notification.success({
                message: 'Перегенерировать код',
                description: <>Код пространства <b>{context.name}</b> изменен</>,
            });
        },
    });

    const renderActions = useCallback((_: string, record: GetSpaceResponse) => {
        let items: MenuProps['items'] = [];
        if (isOrganizer) {
            items = [
                {
                    key: '1',
                    label: <EditSpaceModal
                        triggerComponent={
                            onOpen => (<Typography.Text onClick={onOpen} className={styles.menuItem}>
                                Изменить пространство
                            </Typography.Text>)
                        }
                        spaceId={record.id}
                    />,
                },
                {
                    key: '2',
                    label: <AddUserInSpaceModal
                        spaceId={record.id}
                        triggerComponent={onExit => (
                            <Typography.Text onClick={onExit} className={styles.menuItem}>
                                Добавить участников
                            </Typography.Text>
                        )}
                    />,
                },
                {
                    key: '3',
                    label: 'Скопировать код',
                    onClick: () => copyCode({ id: record.id, name: record.name ?? '' }),
                },
                {
                    key: '4',
                    label: 'Перегенерировать код',
                    onClick: () => regenerateCode({ id: record.id, name: record.name ?? '' }),
                },
            ];
        }
        items.push({
            key: '5',
            label: <ExitUserButton
                spaceName={record.name ?? ''}
                spaceId={record.id}
                triggerComponent={onExit => (
                    <Typography.Text onClick={onExit} className={styles.menuItem}>
                        Покинуть пространство
                    </Typography.Text>
                )}
            />,
        });

        if (isOrganizer) {
            items.push({
                key: '6',
                label: <DeleteSpaceButton
                    spaceId={record.id}
                    spaceName={record.name ?? ''}
                    triggerComponent={onDelete => (
                        <Typography.Text onClick={onDelete} className={styles.menuItem}>
                            Удалить пространство
                        </Typography.Text>)}
                />,
                danger: true,
            });
        }

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, [copyCode, regenerateCode, isOrganizer]);

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
                        <Typography.Text onClick={onOpen} className={styles.menuItem}>
                            Создать пространство
                        </Typography.Text>
                    )}
                />,
            },
            {
                key: '2',
                label: <EnterSpaceByCodeModal
                    triggerComponent={onOpen => (
                        <Typography.Text onClick={onOpen} className={styles.menuItem}>
                            Присоединиться к пространству
                        </Typography.Text>
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
                <Link to={SpaceRouter.Spaces}>
                    <Logo />
                </Link>
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
