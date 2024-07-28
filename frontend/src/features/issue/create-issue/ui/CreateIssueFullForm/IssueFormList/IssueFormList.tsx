import { Select } from 'antd';
import { FC, useCallback } from 'react';

import { FormSolutionType } from '@entities/issue/model/FormSolutionType';
import { GetIssueFormResponse } from '@entities/issue/model/GetIssueFormResponse';

import Trash from '@shared/assets/icons/Trash.svg';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, Checkbox, FlexContainer, FormField, Input } from '@shared/ui';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const IssueFormList: FC<Props> = typedMemo(function IssueFormList({
    className,
    'data-testid': dataTestId = 'IssueFormList',
}) {
    const addListItem = useCallback((
        list: Omit<GetIssueFormResponse, 'id' | 'issueId'>[],
        onChange: (list: Omit<GetIssueFormResponse, 'id' | 'issueId'>[]) => void) => {
        onChange(list.concat([{
            name: '',
            description: '',
            isRequired: true,
            formSolutionType: FormSolutionType.None,
        }]));
    }, []);

    const deleteListItem = useCallback((
        order: number,
        list: GetIssueFormResponse[],
        onChange: (list: GetIssueFormResponse[]) => void) => {
        onChange(list.filter((_, index) => index !== order));
    }, []);

    return (
        <FormField<GetIssueFormResponse[]>
            name="issueFormList"
            label="Форма сдачи"
            content={
                ({ onChange, value }) => (
                    <FlexContainer direction="column" gap="s">
                        {value.map((form, order) => (
                            <FlexContainer direction="row" gap='m'>
                                <FlexContainer direction="column" gap="s">
                                    <FormField<string>
                                        name={`issueFormList[${order}].name`}
                                        label="Название поля"
                                        content={
                                            ({ onChange, value, isInvalid }) => (
                                                <Input
                                                    value={value}
                                                    invalid={isInvalid}
                                                    onChange={event => onChange(event.target.value)}
                                                    onBlur={event => onChange(event.target.value.trim())}
                                                />
                                            )
                                        }
                                    />

                                    <FormField<string>
                                        name={`issueFormList[${order}].description`}
                                        label="Описание поля"
                                        content={
                                            ({ onChange, value }) => (
                                                <Input
                                                    value={value}
                                                    onChange={event => onChange(event.target.value)}
                                                    onBlur={event => onChange(event.target.value.trim())}
                                                />
                                            )
                                        }
                                    />

                                    <FormField<FormSolutionType>
                                        name={`issueFormList[${order}].formSolutionType`}
                                        label="Тип поля"
                                        content={
                                            ({ onChange, value }) => (
                                                <Select
                                                    value={value}
                                                    onChange={value => onChange(value)}
                                                >
                                                    <Select.Option value={FormSolutionType.None}>Не выбран</Select.Option>
                                                    <Select.Option value={FormSolutionType.Text}>Текст</Select.Option>
                                                    <Select.Option value={FormSolutionType.File}>Файл</Select.Option>
                                                </Select>
                                            )
                                        }
                                    />

                                    <FormField<boolean>
                                        name={`issueFormList[${order}].isRequired`}
                                        content={
                                            ({ onChange, value }) => (
                                                <Checkbox
                                                    label="Обязательное поле"
                                                    checked={value}
                                                    onChange={value => onChange(value.target.checked)}
                                                />
                                            )
                                        }
                                    />
                                </FlexContainer>

                                <Button variant="ghost" onClick={() => deleteListItem(order, value, onChange)}>
                                    <Trash />
                                </Button>
                            </FlexContainer>
                        ))}

                        <Button onClick={() => addListItem(value, onChange)}>
                            Добавить поле сдачи
                        </Button>
                    </FlexContainer>
                )
            }
        />
    );
});
