import { FC } from 'react';

import { GetIssueResponse } from '@entities/issue';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './TaskPreparation.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    issue: GetIssueResponse;
}>;

export const TaskPreparation: FC<Props> = typedMemo(function TaskPreparation({
    className,
    'data-testid': dataTestId = 'TaskPreparation',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
