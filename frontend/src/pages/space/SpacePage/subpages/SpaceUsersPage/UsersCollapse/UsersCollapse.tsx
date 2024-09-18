import { RightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { ReactNode, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './UsersCollapse.module.css';

export type Props<TData> = ClassNameProps & TestProps & Readonly<{
    usersName: string;
    users: TData[];
    content: (users: TData[]) => ReactNode;
}>;

export const UsersCollapse = typedMemo(function UsersCollapse<TData>({
    users,
    content,
    usersName,
}: Props<TData>) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = useCallback(() => {
        if (users.length === 0) {
            return;
        }
        setIsOpen(isOpen => !isOpen);
    }, [users]);

    return (
        <Flex vertical gap={20}>
            <Flex
                align="center"
                gap={10}
                onClick={toggleIsOpen}
                className={styles.collapse}
            >
                <Typography.Text className={styles.collapseTitle}>
                    {usersName} ({users.length ?? 0})
                </Typography.Text>
                {users.length > 0 &&
                    <RightOutlined
                        className={getModuleClasses(styles, 'collapseIcon', { isOpen })}
                    />}
            </Flex>

            {isOpen && users.length > 0 ? content(users) : null}
        </Flex>
    );
});
