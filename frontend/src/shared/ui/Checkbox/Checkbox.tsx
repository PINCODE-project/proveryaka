import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode, useId } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './Checkbox.module.css';

export type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & TestProps & {
    /**
     * Текст справа
     */
    label?: ReactNode;
};

/**
 * Чекбокс
 */
export const Checkbox: FC<Props> = typedMemo(function Checkbox({
    label,
    className,
    'data-testid': dataTestId = 'Checkbox',
    ...props
}) {
    const id = useId();

    return (
        <div className={getBemClasses(styles, null, null, className)} data-testid={dataTestId}>
            <input
                id={id}
                type="checkbox"
                {...props}
                data-testid={`${dataTestId}.field`}
                className={getBemClasses(styles, 'input')}
            />
            <label htmlFor={id} className={getBemClasses(styles, 'label')}>
                <div className={getBemClasses(styles, 'labelCheckbox')} />
                <Text className={getBemClasses(styles, 'labelValue')}>{label}</Text>
            </label>
        </div>
    );
});
