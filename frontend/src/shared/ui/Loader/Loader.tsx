import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import { CircleLoader } from './CircleLoader';
import styles from './Loader.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Тип спиннера
     * @default square
     */
    variant?: 'circle';

    /**
     * Размер спиннера (только для круглого)
     */
    size?: number;
}>;

export const Loader: FC<Props> = typedMemo(function Loader({
    variant = 'circle',
    'data-testid': dataTestId = 'Loader',
    className,
    ...props
}: Props) {
    return (
        <FlexContainer
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={getBemClasses(styles, null, null, className)}
        >
            {variant === 'circle'
                ? <CircleLoader data-testid={dataTestId} {...props} />
                : null
            }
        </FlexContainer>);
});
