import { Select, Upload } from 'antd';
import { FC } from 'react';

import { ExampleType } from '@entities/example/common/model/ExampleType';

import { roles } from '@shared/consts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, Input, Textarea } from '@shared/ui';

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
                        <Upload
                            maxCount={1}
                            showUploadList={{
                                showDownloadIcon: true,
                                downloadIcon: 'Down',
                            }}
                            beforeUpload={(file, fileList) => {
                                onChange(file);
                                return false;
                            }}
                            onRemove={() => onChange(null)}
                        >
                            <Button variant="outline">
                                Загрузить файл
                            </Button>
                        </Upload>
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
