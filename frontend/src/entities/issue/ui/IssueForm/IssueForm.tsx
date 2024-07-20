import { DatePicker } from 'antd';
import { Form, Formik } from 'formik';
import { FC } from 'react';

import Trash from '@shared/assets/icons/Trash.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FileInput, FileInputName, FlexContainer, FormField, Input, Text, Textarea } from '@shared/ui';

import styles from './IssueForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    submitText: string;
    onSubmit: (form: any) => void;
    form: any;
}>;

export const IssueForm: FC<Props> = typedMemo(function IssueForm({
    className,
    submitText,
    onSubmit,
    form,
    'data-testid': dataTestId = 'IssueForm',
}) {
    return (
        <Formik
            initialValues={form}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <FlexContainer
                        direction="column"
                        gap="l"
                        className={getBemClasses(styles, null, null, className)}
                        data-testid={dataTestId}
                    >
                        <FlexContainer
                            direction="column"
                            gap="s"
                        >
                            <Text>Общее</Text>
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
                                    name="minRatingCount"
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
                                    name="maxRatingCount"
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
                            <Text>Сдача</Text>
                            <FormField<string>
                                name="assessmentDeadline"
                                label="Дата сдачи"
                                content={
                                    ({ value, onChange, isInvalid }) => (
                                        <DatePicker
                                            value={value}
                                            onChange={onChange}
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
                            <Text>Оценка</Text>
                            <FormField<string>
                                name="submitDeadline"
                                label="Дата оценки"
                                content={
                                    ({ value, onChange, isInvalid }) => (
                                        <DatePicker
                                            value={value}
                                            onChange={onChange}
                                            status={isInvalid ? 'error' : ''}
                                        />
                                    )
                                }
                            />

                            {values.criterias.map((item: unknown, index: number) => (
                                <FlexContainer direction="row">
                                    <FlexContainer direction="column" gap="m">
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

                                        <div className={getBemClasses(styles, 'criteria')}>
                                            <FormField<string>
                                                name="weight"
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
                                                name="minCount"
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
                                                name="maxCount"
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
                                    </FlexContainer>
                                    <button>
                                        <Trash />
                                    </button>
                                </FlexContainer>
                            ))}
                            <Button variant="neutral">Добавить критерий</Button>
                        </FlexContainer>

                        <FlexContainer
                            direction="column"
                            gap="m"
                        >
                            <Text>Примеры решения</Text>
                            {values.criterias.map((item: unknown, index: number) => (
                                <FlexContainer direction="row">
                                    <FlexContainer direction="column" gap="m">
                                        <FormField<File | null>
                                            name="name"
                                            label="Название"
                                            content={
                                                ({ value, onChange, isInvalid }) => (
                                                    <FileInput
                                                        fileUrl={value ? URL.createObjectURL(value) : value}
                                                        onChangeFile={onChange}
                                                        acceptType={[]}
                                                    >
                                                        <FileInputName tooltipType='name' />
                                                    </FileInput>
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
                                    </FlexContainer>
                                    <button>
                                        <Trash />
                                    </button>
                                </FlexContainer>
                            ))}
                            <Button variant="neutral">Добавить пример</Button>
                        </FlexContainer>

                        <FlexContainer
                            direction="column"
                            gap="m"
                        >
                            <Text>Антипримеры решения</Text>
                            {values.criterias.map((item: unknown, index: number) => (
                                <FlexContainer direction="row" key={index}>
                                    <FlexContainer direction="column" gap="m">
                                        <FormField<File | null>
                                            name="name"
                                            label="Название"
                                            content={
                                                ({ value, onChange, isInvalid }) => (
                                                    <FileInput
                                                        fileUrl={value ? URL.createObjectURL(value) : value}
                                                        onChangeFile={onChange}
                                                        acceptType={[]}
                                                    >
                                                        <FileInputName tooltipType='name' />
                                                    </FileInput>
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
                                    </FlexContainer>
                                    <button>
                                        <Trash />
                                    </button>
                                </FlexContainer>
                            ))}
                            <Button variant="neutral">Добавить антипример</Button>
                        </FlexContainer>

                        <Button type="submit">
                            {submitText}
                        </Button>
                    </FlexContainer>
                </Form>
            )}
        </Formik>
    );
});
