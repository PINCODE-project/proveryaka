import { FC, useEffect, useState } from 'react';

import { ExampleResponse } from '@entities/example/common';

import { getFile } from '@shared/api';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './Item.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    sol: ExampleResponse;
}>;

export const Item: FC<Props> = typedMemo(function Item({
    sol,
    className,
    'data-testid': dataTestId = 'Item',
}) {
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (sol.fileIdValue) {
            async () => {
                const a = await getFile(sol.fileIdValue ?? '');
                setFile(a);
            };
        }
    }, []);

    return (
        <div className={getBemClasses(styles, 'solutionScroll')}>
            <img />
            <Text className={getBemClasses(styles, 'link')}>
                {sol.exampleLink ?? ''}
            </Text>
            <Text className={getBemClasses(styles, 'description')}>
                {sol.description ?? ''}
            </Text>
        </div>
    );
});
