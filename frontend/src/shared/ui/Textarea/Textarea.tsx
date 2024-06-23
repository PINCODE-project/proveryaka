import {
    createRef,
    DetailedHTMLProps,
    FormEvent,
    TextareaHTMLAttributes,
    useCallback,
    useEffect,
    useMemo,
    useState,
    FocusEvent,
    useId, ReactNode,
} from 'react';

import { useDebounceState } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { resizeTextArea } from './resizeTextArea';
import styles from './Textarea.module.css';

export type Props = TestProps
    & ClassNameProps
    & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    & {
    invalid?: boolean;
    actions?: ReactNode;
};

/**
 * Большое поле ввода.
 */
export const Textarea = typedMemo(function Textarea({
    className,
    actions,
    'data-testid': dataTestId = 'Textarea',
    ...textareaProps
}: Props) {
    const ref = useMemo(() => createRef<HTMLTextAreaElement>(), []);
    const textareaId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const debounceIsFocused = useDebounceState(isFocused, 200);

    const handleInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
        if (ref.current != null) {
            resizeTextArea(ref.current);
        }

        textareaProps.onInput?.(event);
    }, [textareaProps, ref]);

    useEffect(() => {
        if (ref.current != null) {
            resizeTextArea(ref.current);
        }
    }, [ref, debounceIsFocused]);

    const onBlur = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
        textareaProps?.onBlur?.(event);
        setIsFocused(false);
    }, [textareaProps]);

    const onFocus = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
        textareaProps?.onFocus?.(event);
        setIsFocused(true);
    }, [textareaProps]);

    return (
        <label className={getBemClasses(styles, 'label')}>
            <textarea
                id={textareaId}
                data-testid={dataTestId}
                {...textareaProps}
                onBlur={onBlur}
                onFocus={onFocus}
                className={
                    getBemClasses(
                        styles,
                        null,
                        { invalid: textareaProps.invalid },
                        className,
                    )
                }
                ref={ref}
                onInput={handleInput}
            />
            {
                actions
                    ? <div className={getBemClasses(styles, 'actions')}>
                        {actions}
                    </div>
                    : null
            }
        </label>

    );
});
