import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button } from '@shared/ui';

import styles from './CopySpaceCode.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    inviteCode: string;
}>;

export const CopySpaceCode: FC<Props> = typedMemo(function CopySpaceCode({
    className,
    inviteCode,
    'data-testid': dataTestId = 'CopySpaceCode',
}) {
    const copy = useCallback(async () => {
        try {
            await window.navigator.clipboard.writeText(inviteCode);
            toast.success('Пригласительный код скопирован!');
        } catch (err) {
            toast.error('Не удалось скопировать код');
        }
    }, [inviteCode]);

    return (
        <Button
            onClick={copy}
            variant="ghost"
            size="small"
            className={getBemClasses(styles, null, null, className)}
        >
            Скопировать код
        </Button>
    );
});
