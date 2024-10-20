import { FC, useMemo } from 'react';

import { Status } from '@entities/issue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SolutionStatusBadge.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: Status;
}>;

export const StatusBadge: FC<Props> = typedMemo(function StatusBadge({
    status,
}) {
    const text = useMemo(() => {
        switch (status) {
            case Status.Submitted:
                return 'Сдано';
            case Status.OnCheck:
                return 'На проверке';
            case Status.NeedCheck:
                return 'Ожидается проверка';
            case Status.Checked:
                return 'Проверено';
            case Status.CheckExpired:
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
