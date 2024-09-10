import { Flex, Typography } from 'antd';
import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './EmptyTable.module.css';

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
