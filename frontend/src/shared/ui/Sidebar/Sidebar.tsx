import { Flex } from 'antd';
import { FC, PropsWithChildren } from 'react';

import LogoMin from '@shared/assets/images/logo-min.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Sidebar.module.css';

export type Props = ClassNameProps & TestProps & PropsWithChildren & Readonly<{}>;

export const Sidebar: FC<Props> = typedMemo(function Sidebar({
    children,
    className,
}) {
    return (
        <Flex
            vertical
            gap={26}
            align="center"
            className={getModuleClasses(styles, 'menu', null, className)}
        >
            <LogoMin className={getModuleClasses(styles, 'logo')} />
            {children}
        </Flex>
    );
});
