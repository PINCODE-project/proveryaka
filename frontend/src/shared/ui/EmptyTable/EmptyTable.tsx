import { Flex, Typography } from 'antd';
import { FC } from 'react';

import styles from './EmptyTable.module.css';
import { typedMemo } from '../../lib';
import { getModuleClasses } from '../../lib/getModuleClasses';
import { ClassNameProps, TestProps } from '../../types';

export type Props = ClassNameProps & TestProps & Readonly<{
    text: string;
}>;

export const EmptyTable: FC<Props> = typedMemo(function EmptyTable({
    className,
    text,
}) {
    return (
        <Flex
            justify="center"
            align="end"
            className={getModuleClasses(styles, 'root', null, className)}
        >
            <Typography.Text className={getModuleClasses(styles, 'text')}>
                {text}
            </Typography.Text>
        </Flex>
    );
});
