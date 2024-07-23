import { DatePicker } from 'antd';
import { FC, useCallback } from 'react';

import Trash from '@shared/assets/icons/Trash.svg';
import { typedMemo, getBemClasses } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Input, Text, Textarea } from '@shared/ui';

import styles from './IssueForm.module.css';
import dayjs from "dayjs";

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const IssueForm: FC<Props> = typedMemo(function IssueForm({}) {
    const changeUrl = useCallback((materialUrl: string[], url: string, order: number) => {
        materialUrl[order] = url;
        return materialUrl;
    }, []);

    const deleteUrl = useCallback((materialUrl: string[], order: number) => {
        return materialUrl.filter((_, index) => index !== order);
    }, []);

    const addUrl = useCallback((materialUrl: string[] | null) => {
        return (materialUrl ?? []).concat(['']);
    }, []);

    return (
        <>
            <FlexContainer
                direction="column"
                gap="s"
            >
                <FormField<string>
                    name="name"
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
                    name="description"
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
                <FlexContainer direction="row" gap="m">
                    <FormField<string>
                        name="checksCountMin"
                        label="Минимальное кол-во оценок"
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
                        name="checksCountMax"
                        label="Максимальное кол-во оценок"
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
                </FlexContainer>
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="m"
            >
                <Text>Дедлайны</Text>
                <FormField<Date>
                    name="assessmentDeadlineDateUtc"
                    label="Дата сдачи"
                    content={
                        ({ value, onChange, isInvalid }) => (
                            <DatePicker
                                defaultValue={dayjs(value)}
                                onChange={(date) => onChange(date.toDate())}
                                status={isInvalid ? 'error' : ''}
                            />
                        )
                    }
                />
                <FormField<Date>
                    name="submitDeadlineDateUtc"
                    label="Дата оценки"
                    content={
                        ({ value, onChange, isInvalid }) => (
                            <DatePicker
                                defaultValue={dayjs(value)}
                                onChange={(date) => onChange(date.toDate())}
                                status={isInvalid ? 'error' : ''}
                            />
                        )
                    }
                />
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="m"
            >
                <Text>Материалы для подготовки</Text>
                <FormField<string[] | null>
                    name="materialUrls"
                    content={
                        ({ value, onChange, error }) => (
                            <FlexContainer direction="column" gap="m">
                                {(value ?? []).map((url, index) => (
                                    <FlexContainer direction="row" gap="m" key={index}>
                                        <Input
                                            value={url}
                                            placeholder="Введите ссылку"
                                            onChange={event => onChange(changeUrl(value ?? [], event.target.value, index))}
                                            onBlur={event => onChange(changeUrl(value ?? [], event.target.value.trim(), index))}
                                            invalid={Boolean(error?.[index])}
                                        />

                                        <Button variant="ghost" onClick={() => onChange(deleteUrl(value ?? [], index))}>
                                            <Trash />
                                        </Button>
                                    </FlexContainer>
                                ))}

                                <Button onClick={() => onChange(addUrl(value))}>
                                   Добавить материал
                                </Button>
                            </FlexContainer>
                        )
                    }
                />
            </FlexContainer>
        </>
    );
});
