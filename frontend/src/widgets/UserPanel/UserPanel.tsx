import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';

import { useAuthContext } from '@app/providers/AuthProvider';

import { useGetCurrentUserInfo } from '@entities/user';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './UserPanel.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const UserPanel: FC<Props> = typedMemo(function UserPanel() {
    const { logout } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const { data: user } = useGetCurrentUserInfo();

    const items = useMemo<MenuProps['items']>(() => [
        {
            key: '1',
            label: 'Настройки профиля',
            disabled: true,
        },
        {
            key: '2',
            label: 'Выйти из аккаунта',
            onClick: logout,
        },
    ], [logout]);

    if (!user) {
        return null;
    }
    return (
        <Flex gap="middle" align="center">
            {/** TODO: NotificationsModal **/}

            <Dropdown menu={{ items }} trigger={['click']} onOpenChange={setIsOpen}>
                <Flex gap="small" align="center" className={getModuleClasses(styles, 'info')}>
                    <Avatar size={32} src="" />
                    <Typography.Text>
                        {user.surname} {user.name}
                    </Typography.Text>
                    <DownOutlined rotate={isOpen ? 180 : 0} />
                </Flex>
            </Dropdown>
        </Flex>
    );
});
