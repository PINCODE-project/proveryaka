import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { useGetCurrentUserInfo } from '@entities/user';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Avatar } from '@shared/ui';

import { UserEditor } from './UserEditor';
import styles from './UserPanel.module.css';

export type Props = ClassNameProps & TestProps;

export const UserPanel: FC<Props> = typedMemo(function UserPanel() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { logout } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const { data: user } = useGetCurrentUserInfo();

    const handleLogout = useCallback(() => {
        queryClient.invalidateQueries().then(() => {
            logout();
            navigate(AuthRouter.SignIn);
        });
    }, [navigate, queryClient, logout]);

    const items = useMemo<MenuProps['items']>(() => [
        {
            key: '1',
            label: <UserEditor
                triggerComponent={onOpen => (
                    <Typography.Text onClick={onOpen} className={styles.menuItem}>
                        Настройки профиля
                    </Typography.Text>
                )}
            />,
        },
        {
            key: '2',
            label: 'Выйти из аккаунта',
            onClick: handleLogout,
        },
    ], [handleLogout]);

    if (!user) {
        return null;
    }
    return (
        <Flex gap="middle" align="center">
            {/** TODO: NotificationsModal **/}

            <Dropdown menu={{ items }} trigger={['click']} onOpenChange={setIsOpen}>
                <Flex gap="small" align="center" className={getModuleClasses(styles, 'info')}>
                    <Avatar size={32} fileId={user.avatar} apiType="estimate" />
                    <Typography.Text>
                        {user.surname} {user.name}
                    </Typography.Text>
                    <DownOutlined rotate={isOpen ? 180 : 0} />
                </Flex>
            </Dropdown>
        </Flex>
    );
});
