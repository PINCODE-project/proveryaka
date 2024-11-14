import { Flex, Typography } from 'antd';
import { FC, useMemo } from 'react';

import { GetCriteriaExample } from '@entities/example/criteria-example';

import { typedMemo, useGetEstimateFile } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Example.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    example: GetCriteriaExample;
}>;

export const Example: FC<Props> = typedMemo(function Example({
    example,
}) {
    const { data: file } = useGetEstimateFile(example.fileIdValue ?? '', { enabled: Boolean(example.fileIdValue) });
    const fileUrl = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

    return (
        <Flex gap={24} vertical>
            {fileUrl ? <img src={fileUrl} className={styles.image} alt={example.textValue ?? ''} /> : null}
            {example.textValue
                ? <Typography className={styles.text}>
                    {example.textValue}
                </Typography>
                : null}
            {example.description
                ? <Typography className={styles.text}>
                    {example.description}
                </Typography>
                : null}
        </Flex>
    );
});
