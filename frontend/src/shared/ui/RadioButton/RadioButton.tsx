import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './RadioButton.module.css';

export type Props = ClassNameProps & TestProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Readonly<{
    label: ReactNode;
    name: string;
}>;

export const RadioButton: FC<Props> = typedMemo(function RadioButton({
    name,
    label,
    className,
    'data-testid': dataTestId = 'RadioButton',
    ...inputProps
}) {
    return (
        <label
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <input
                type="radio"
                name={name}
                className={getBemClasses(styles, 'input')}
                {...inputProps}
            />
            {label}
        </label>
    );
});
