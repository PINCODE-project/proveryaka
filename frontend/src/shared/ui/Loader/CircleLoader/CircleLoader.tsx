import { FC, useMemo } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps } from '@shared/types';
import { ClassNameProps } from '@shared/types/ClassNameProps';

import styles from './CircleLoader.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Размер спиннера
     */
    size?: number;
}>;

export const CircleLoader: FC<Props> = typedMemo(function CircleLoader({
    className,
    size = 30,
    'data-testid': dataTestId = 'CircleLoader',
}: Props) {
    const spinnerStyle = useMemo(() => ({ width: size + 'px', height: size + 'px' }), [size]);
    const spinnerItemStyles = useMemo(() => {
        return { width: size + 'px', height: size + 'px', borderWidth: size ** 0.4 + 'px' };
    }, [size]);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
            style={spinnerStyle}
        >
            <div className={getBemClasses(styles, 'item')} style={spinnerItemStyles} />
            <div className={getBemClasses(styles, 'item')} style={spinnerItemStyles} />
            <div className={getBemClasses(styles, 'item')} style={spinnerItemStyles} />
            <div className={getBemClasses(styles, 'item')} style={spinnerItemStyles} />
        </div>
    );
});
