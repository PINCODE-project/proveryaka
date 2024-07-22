import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FormField, Input, Textarea } from '@shared/ui';

import styles from './CriteriaForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Приставка перед именами полей
     */
    formParentFieldName?: string;
}>;

export const CriteriaForm: FC<Props> = typedMemo(function CriteriaForm({
    formParentFieldName,
}) {
    return (
        <>
            <FormField<string>
                name={`${formParentFieldName ? formParentFieldName + '.' : ''}name`}
                label="Название"
                content={
                    ({ value, onChange, isInvalid }) => (
                        <Input
                            value={value}
                            placeholder="Введите название"
                            onChange={event => onChange(event.target.value)}
                            onBlur={event => onChange(event.target.value.trim())}
                            invalid={isInvalid}
                        />
                    )
                }
            />
            <FormField<string>
                name={`${formParentFieldName ? formParentFieldName + '.' : ''}description`}
                label="Описание"
                content={
                    ({ value, onChange, isInvalid }) => (
                        <Textarea
                            value={value}
                            placeholder="Введите описание"
                            onChange={event => onChange(event.target.value)}
                            onBlur={event => onChange(event.target.value.trim())}
                            invalid={isInvalid}
                        />
                    )
                }
            />

            <div className={getBemClasses(styles, 'criteria')}>
                <FormField<string>
                    name={`${formParentFieldName ? formParentFieldName + '.' : ''}weight`}
                    label="Вес"
                    content={
                        ({ value, onChange, isInvalid }) => (
                            <Input
                                type="number"
                                value={value}
                                onChange={event => onChange(event.target.value)}
                                onBlur={event => onChange(event.target.value.trim())}
                                invalid={isInvalid}
                            />
                        )
                    }
                />
                <FormField<string>
                    name={`${formParentFieldName ? formParentFieldName + '.' : ''}minScore`}
                    label="Мин. оценка"
                    content={
                        ({ value, onChange, isInvalid }) => (
                            <Input
                                type="number"
                                value={value}
                                onChange={event => onChange(event.target.value)}
                                onBlur={event => onChange(event.target.value.trim())}
                                invalid={isInvalid}
                            />
                        )
                    }
                />
                <FormField<string>
                    name={`${formParentFieldName ? formParentFieldName + '.' : ''}maxScore`}
                    label="Макс. оценка"
                    content={
                        ({ value, onChange, isInvalid }) => (
                            <Input
                                type="number"
                                value={value}
                                onChange={event => onChange(event.target.value)}
                                onBlur={event => onChange(event.target.value.trim())}
                                invalid={isInvalid}
                            />
                        )
                    }
                />
            </div>
        </>
    );
});
