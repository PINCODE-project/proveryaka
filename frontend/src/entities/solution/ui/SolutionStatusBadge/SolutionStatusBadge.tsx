import { FC, useMemo } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SolutionStatusBadge.module.css';
import { SolutionStatus } from '../../model/SolutionStatus';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: SolutionStatus;
}>;

export const SolutionStatusBadge: FC<Props> = typedMemo(function SolutionStatusBadge({
    status,
}) {
    const text = useMemo(() => {
        switch (status) {
            case SolutionStatus.Submitted:
                return 'Сдано';
            case SolutionStatus.OnCheck:
                return 'На проверке';
            case SolutionStatus.NeedCheck:
                return 'Ожидается проверка';
            case SolutionStatus.Checked:
                return 'Проверено';
            case SolutionStatus.CheckExpired:
                return 'Просрочена проверка';
            default:
                return null;
        }
    }, [status]);

    if (!text) {
        return null;
    }
    return (
        <div className={styles.badge}>
            {text}
        </div>
    );
});
