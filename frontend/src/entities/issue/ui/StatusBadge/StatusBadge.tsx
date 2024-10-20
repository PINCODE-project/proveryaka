import { FC, useMemo } from 'react';

import { Status } from '@entities/issue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './StatusBadge.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: Status;
    type: 'issue' | 'solution';
}>;

export const StatusBadge: FC<Props> = typedMemo(function StatusBadge({
    status,
    type,
}) {
    const text = useMemo(() => {
        switch (status) {
            case Status.ClosedSubmit:
                return type === 'issue' ? 'Не опубликовано' : null;
            case Status.OpenSubmit:
                return type === 'issue' ? 'Открыта сдача' : null;
            case Status.NotAllChecked:
                return type === 'issue' ? 'На проверке' : null;
            case Status.AllChecked:
                return type === 'issue' ? 'Проверено' : null;
            case Status.SubmitExpired:
                return type === 'issue' ? 'Просрочено' : null;
            case Status.Submitted:
                return 'Сдано';
            case Status.OnCheck:
                return 'На проверке';
            case Status.NeedCheck:
                return type === 'solution' ? 'Ожидается проверка' : null;
            case Status.Checked:
                return 'Проверено';
            case Status.CheckExpired:
                return 'Просрочена проверка';
            default:
                return null;
        }
    }, [status, type]);

    if (!text) {
        return null;
    }
    return (
        <div className={styles.badge}>
            {text}
        </div>
    );
});
