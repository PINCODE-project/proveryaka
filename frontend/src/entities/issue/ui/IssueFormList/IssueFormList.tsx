import { Upload, UploadFile } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useMemo } from 'react';
import * as Yup from 'yup';

import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { FormSolutionType } from '@entities/issue/model/FormSolutionType';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FileInput, FileInputName, FlexContainer, FormField, Text, Textarea } from '@shared/ui';

export type Props = ClassNameProps & TestProps & Readonly<{
    issueId: string;
    form?: GetSolutionValue[];
    onSubmit: (data: Omit<GetSolutionValue, 'id'>[]) => void;
    submitButton?: (handleSubmit: () => void) => ReactNode;
    disabled?: boolean;
}>;

export const IssueFormList: FC<Props> = typedMemo(function IssueFormList({
    className,
    issueId,
    form,
    onSubmit,
    disabled,
    submitButton,
    'data-testid': dataTestId = 'IssueFormList',
}) {
    const { data: issueForm } = useGetIssueFormList(issueId);

    const validationSchema = useMemo(() => {
        return Yup.tuple(
            // @ts-ignore
            issueForm?.issueFormList.map(form => {
                if (form.formSolutionType === FormSolutionType.File) {
                    return Yup.object({
                        file: form.isRequired ? Yup.mixed().required('Выберите файл') : Yup.mixed(),
                    });
                } else {
                    return Yup.object({
                        textValue: form.isRequired ? Yup.string().required('Введите текст') : Yup.string(),
                    });
                }
            }) ?? []);
    }, [issueForm]);

    const initialData = useMemo((): Omit<GetSolutionValue, 'id'>[] =>
        issueForm?.issueFormList.map(form => ({
            textValue: null,
            fileIdList: [],
            issueFormId: form.id,
        })) ?? [], [issueForm]);

    return (
        <Formik
            initialValues={form ?? initialData}
            onSubmit={onSubmit}
            disabled={disabled}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, values }) => (
                <Form className={className}>
                    {issueForm?.issueFormList.map((form, index) => (
                        form.formSolutionType === FormSolutionType.File
                            ? <FormField<File | null>
                                name={`[${index}].file`}
                                label={form.name ?? ''}
                                content={
                                    ({ onChange, value, isInvalid }) => (
                                        <FlexContainer direction="column" gap="xs">
                                            <Text>{form.description}</Text>
                                            <FileInput
                                                disabled={disabled}
                                                fileUrl={value ? URL.createObjectURL(value) : null}
                                                filename={value?.name}
                                                onChangeFile={file => onChange(file)}
                                                acceptType={['.docs', '.pdf', '.png', '.jpg', '.xlsx', '.word']}
                                            >
                                                <FileInputName tooltipType="name" />
                                            </FileInput>
                                        </FlexContainer>
                                    )
                                }
                            />
                            : <FormField<string>
                                name={`[${index}].textValue`}
                                label={form.name ?? ''}
                                content={
                                    ({ onChange, value, isInvalid }) => (
                                        <FlexContainer direction="column" gap="xs" style={{ width: '100%' }}>
                                            <Text>{form.description}</Text>
                                            <Textarea
                                                disabled={disabled}
                                                value={value}
                                                invalid={isInvalid}
                                                onChange={event => onChange(event.target.value)}
                                                onBlur={event => onChange(event.target.value.trim())}
                                            />
                                        </FlexContainer>
                                    )
                                }
                            />
                    ))}

                    {!disabled && submitButton?.(() => handleSubmit())}
                </Form>
            )}
        </Formik>
    );
});
