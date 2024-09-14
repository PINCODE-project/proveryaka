import { Typography } from 'antd';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SidebarItem.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    to: string;
    icon: (className: string) => ReactNode;
    text: string;
}>;

export const SidebarItem: FC<Props> = typedMemo(function SidebarItem({
    to,
    icon,
    text,
}) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => getModuleClasses(styles, 'navItem', { isActive })}
        >
            {icon(getModuleClasses(styles, 'navIcon'))}
            <Typography.Text className={getModuleClasses(styles, 'navText')}>
                {text}
            </Typography.Text>
        </NavLink>
    );
});
