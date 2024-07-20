import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button } from '@shared/ui';

import styles from './CopySpaceCode.module.css';
import { copySpaceCode } from '../../lib/copySpaceCode';

export type Props = ClassNameProps & TestProps & Readonly<{
    inviteCode: string;
}>;

export const CopySpaceCode: FC<Props> = typedMemo(function CopySpaceCode({
    className,
    inviteCode,
}) {
    return (
        <Button
            onClick={() => copySpaceCode(inviteCode)}
            variant="ghost"
            size="small"
            className={getBemClasses(styles, null, null, className)}
        >
            Скопировать код
        </Button>
    );
});
