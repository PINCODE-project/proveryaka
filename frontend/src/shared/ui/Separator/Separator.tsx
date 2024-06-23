import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Separator.module.css';

export type Props =
    ClassNameProps &
    TestProps &
    PropsWithChildren &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
    Readonly<{
    /**
     * Ориентация разделителя
     * @default horizontal
     */
    orientation?: 'vertical' | 'horizontal';
}>;

export const Separator: FC<Props> = typedMemo(function Separator({
    orientation = 'horizontal',
    children,
    className,
    'data-testid': dataTestId = 'Separator',
    ...divProps
}) {
    return (
        <div
            className={getBemClasses(styles, null, { orientation }, className)}
            data-testid={dataTestId}
            {...divProps}
        >
            {children}
        </div>
    );
});
