import { Select, Upload } from 'antd';
import { FC } from 'react';

import { ExampleType } from '@entities/example/common/model/ExampleType';

import { roles } from '@shared/consts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FileInput, FileInputName, FlexContainer, FormField, Input, Text, Textarea } from '@shared/ui';

import styles from './ExampleForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Приставка перед именами полей
     */
    formParentFieldName?: string;

    /**
     * С выбором типа примера
     */
    withTypeSelect?: boolean;
}>;

export const ExampleForm: FC<Props> = typedMemo(function ExampleForm({
    withTypeSelect,
    formParentFieldName,
}) {
    return (
        <>
            {withTypeSelect
                ? <FormField
                    name={`${formParentFieldName ? formParentFieldName + '.' : ''}exampleType`}
                    label="Тип примера"
                    content={
                        ({ onChange, isInvalid, value }) => (
                            <Select
                                showSearch
                                value={value}
                                status={isInvalid ? 'error' : undefined}
                                onChange={type => {
                                    onChange(type);
                                }}
                                className={getBemClasses(styles, 'select')}
                            >
                                <Select.Option value={ExampleType.Standard}>
                                        Эталон
                                </Select.Option>
                                <Select.Option value={ExampleType.AntiExample}>
                                    Антипример
                                </Select.Option>
                            </Select>
                        )
                    }
                />
                : null}

            <FormField<File | null>
                name={`${formParentFieldName ? formParentFieldName + '.' : ''}file`}
                label="file"
                content={
                    ({ value, onChange, isInvalid }) => (
                        <FileInput
                            fileUrl={value ? URL.createObjectURL(value) : null}
                            filename={value?.name}
                            onChangeFile={file => onChange(file)}
                            acceptType={['.png', '.jpg']}
                        >
                            <FileInputName tooltipType="image" />
                        </FileInput>
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
        </>
    );
});
