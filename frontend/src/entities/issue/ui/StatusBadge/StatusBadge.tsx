import { FC } from 'react';

import { IssueStatus, IssueStringStatus } from '@entities/issue/model/IssueStatus';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './StatusBadge.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: IssueStatus;
    type: 'issue' | 'solution';
}>;

export const StatusBadge: FC<Props> = typedMemo(function StatusBadge({ status }) {
    const text = IssueStringStatus[status];

    if (!text) {
        return null;
    }
    return (
        <div className={styles.badge}>
            {text}
        </div>
    );
});
