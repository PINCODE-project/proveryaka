import { Flex, Spin } from 'antd';
import { FC } from 'react';

import { typedMemo, getModuleClasses } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Fallback.module.css';

export type Props = ClassNameProps & TestProps;

export const Fallback: FC<Props> = typedMemo(function Fallback({
    className,
}) {
    return (
        <Flex
            align="center"
            justify="center"
            className={getModuleClasses(styles, 'container', null, className)}
        >
            <Spin />
        </Flex>
    );
});
