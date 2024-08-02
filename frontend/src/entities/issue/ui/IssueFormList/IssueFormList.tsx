import { Upload, UploadFile } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useMemo } from 'react';
import * as Yup from 'yup';

import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { FormSolutionType } from '@entities/issue/model/FormSolutionType';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Text, Textarea } from '@shared/ui';

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
                        fileIdList: form.isRequired ? Yup.array().min(1, 'Выберите файл') : Yup.array(),
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
            textValue: '',
            fileIdList: [],
            issueFormId: form.issueId,
        })) ?? [], [issueForm]);

    console.log(form);
    return (
        <Formik
            initialValues={form ?? initialData}
            onSubmit={onSubmit}
            disabled={disabled}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <Form>
                    {issueForm?.issueFormList.map((form, index) => (
                        form.formSolutionType === FormSolutionType.File
                            ? <FormField<UploadFile[]>
                                name={`[${index}].fileIdList`}
                                label={form.name ?? ''}
                                content={
                                    ({ onChange, value, isInvalid }) => (
                                        <FlexContainer direction="column" gap="xs">
                                            <Text>{form.description}</Text>
                                            <Upload
                                                disabled={disabled}
                                                maxCount={1}
                                                beforeUpload={file => {
                                                    onChange([file]);
                                                    return false;
                                                }}
                                                onRemove={() => onChange([])}
                                                fileList={value}
                                            >
                                                <Button variant="outline" disabled={disabled}>
                                                    Загрузить файл
                                                </Button>
                                            </Upload>
                                        </FlexContainer>
                                    )
                                }
                            />
                            : <FormField<string>
                                name={`[${index}].textValue`}
                                label={form.name ?? ''}
                                content={
                                    ({ onChange, value, isInvalid }) => (
                                        <FlexContainer direction="column" gap="xs">
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

                    {submitButton?.(() => handleSubmit())}
                </Form>
            )}
        </Formik>
    );
});
