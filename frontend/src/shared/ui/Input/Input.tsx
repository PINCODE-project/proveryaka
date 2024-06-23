import { ChangeEventHandler, DetailedHTMLProps, forwardRef, InputHTMLAttributes, useCallback } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Input.module.css';

export type Props = TestProps
    & ClassNameProps
    & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Readonly<{
    invalid?: boolean;
    }>;

/**
 * Поле ввода.
 */
export const Input = typedMemo(forwardRef<HTMLInputElement, Props>(function Input({
    invalid,
    className,
    type,
    onChange: innerOnChange,
    ...inputProps
}, propsRef) {
    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        if (type === 'number') {
            const value = event.target.value.trim();

            if (value.length === 0 || !Number.isNaN(Number(value))) {
                innerOnChange?.(event);
            }
        } else {
            innerOnChange?.(event);
        }
    }, [innerOnChange, type]);

    return (
        <input
            {...inputProps}
            onChange={onChange}
            type={type === 'number' ? 'string' : type}
            className={
                getBemClasses(
                    styles,
                    null,
                    { invalid },
                    className,
                )
            }
            ref={propsRef}
        />
    );
}));
