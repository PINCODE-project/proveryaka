import { useField, ErrorMessage } from 'formik';
import { ReactElement } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './FormField.module.css';

export type FormFieldContext<TValue> = {
    /**
     * Метод изменения значения поля
     * @param value значение
     */
    onChange: (value: TValue) => void;

    /**
     * Значение поля
     */
    value: TValue;

    /**
     * Невалидно ли поле
     */
    isInvalid: boolean;
};

export type Props<TValue> = ClassNameProps & TestProps & Readonly<{
    /**
     * Имя поля
     */
    name: string;

    /**
     * Подпись поля
     */
    label?: string | ReactElement;

    /**
     * Компонент в правом углу поля
     */
    endContent?: ReactElement;

    /**
     * Компонент поля
     * @param context контекст поля формы
     */
    content: (context: FormFieldContext<TValue>) => ReactElement;

    /**
     * Метод изменения поля
     * @param value значение поля
     */
    onChange?: (value: TValue) => void;
}>;

/**
 * Обертка для поля в форме
 */
export const FormField = typedMemo(function FormField<TValue>({
    label,
    name,
    endContent,
    className,
    onChange,
    'data-testid': dataTestId = 'FormField',
    content,
}: Props<TValue>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, fieldMeta, fieldHelper] = useField(name);
    const isInvalid = fieldMeta.error !== undefined && fieldMeta.touched;

    return (
        <FlexContainer
            direction="column"
            gap="xs"
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {typeof label === 'string'
                ? <label htmlFor={name} className={getBemClasses(styles, 'label')}>
                    {label}
                </label>
                : label
            }

            <div className={getBemClasses(styles, 'field')}>
                {content({ onChange: onChange ?? fieldHelper.setValue, value: fieldMeta.value, isInvalid })}

                {
                    endContent
                        ? <div className={getBemClasses(styles, 'endContent')}>
                            {endContent}
                        </div>
                        : null
                }
            </div>

            {isInvalid
                ? <Text className={getBemClasses(styles, 'error')}>
                    <ErrorMessage name={name} />
                </Text>
                : null}
        </FlexContainer>
    );
});
