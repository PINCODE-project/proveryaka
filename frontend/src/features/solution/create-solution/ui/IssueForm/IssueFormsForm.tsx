import { Button, Flex, Form } from 'antd';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateSolution } from '@features/solution/create-solution/lib/useCreateSolution';
import { useDeleteSolution } from '@features/solution/create-solution/lib/useDeleteSolution';
import { CreateSolution } from '@features/solution/create-solution/model/CreateSolution';

import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';
import { useRolesCheck } from '@entities/space';

import { createFile } from '@shared/api/file/solution/createFile';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { IssueFormForm } from './IssueFormForm/IssueFormForm';
import styles from './IssueFormsForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    issueId: string;
    solutionId?: string;
    disabled?: boolean;
    initialData?: GetSolutionValue[];
}>;

export const IssueFormsForm: FC<Props> = typedMemo(function IssueFormsForm({
    issueId,
    initialData,
    solutionId,
    disabled,
}) {
    const queryClient = useQueryClient();
    const { isStudent } = useRolesCheck();

    const [form] = Form.useForm();
    const { data: formList } = useGetIssueFormList(issueId);
    const solutionValues: Omit<GetSolutionValue, 'id'>[] = useMemo(() => formList?.issueFormList
        .map(item => ({
            textValue: null,
            fileIdList: null,
            file: null,
            issueFormId: item.id,
            name: item.name ?? '',
            description: item.description ?? '',
            isRequired: item.isRequired,
            formSolutionType: item.formSolutionType,
        })) ?? [], [formList]);

    const { mutate: createSolution } = useCreateSolution({
        onSuccess: () => {
            queryClient.resetQueries(getStudentIssueSolutionQueryKey(issueId));
        },
    });

    const { mutate: deleteSolution } = useDeleteSolution({
        onSuccess: () => {
            queryClient.resetQueries(getStudentIssueSolutionQueryKey(issueId));
        },
    });

    useEffect(() => {
        form.setFieldsValue({ solutionValueList: initialData ?? solutionValues });
    }, [initialData, form, solutionValues]);

    const onFinish = useCallback(async (form: CreateSolution) => {
        const data: CreateSolution = {
            issueId,
            solutionValueList: form.solutionValueList?.map(item => ({
                fileIdList: [],
                textValue: item.textValue,
                name: item.name,
                description: item.name,
                isRequired: item.isRequired,
                formSolutionType: item.formSolutionType,
                issueFormId: item.issueFormId,
            })) ?? [],
        };

        const promises: Promise<void>[] = [];
        form.solutionValueList?.forEach((item, index) => {
            if (item.file) {
                promises.push(createFile(item.file).then(res => {
                    if (data.solutionValueList) {
                        data.solutionValueList[index].fileIdList = [res.id];
                    }
                }));
            }
        });

        await Promise.all(promises);
        createSolution({ issueId, data });
    }, [createSolution, issueId]);

    return (
        <Form
            form={form}
            initialValues={{ solutionValueList: solutionValues }}
            name="EditUserForm"
            layout="vertical"
            onFinish={isStudent ? onFinish : undefined}
            className={styles.form}
        >
            <Flex gap={36} vertical>
                <Form.List name="solutionValueList">
                    {() => {
                        return solutionValues.map((item, index) => (
                            <IssueFormForm
                                disabled={!isStudent || Boolean(initialData) || disabled}
                                item={item}
                                order={index}
                                key={item.issueFormId}
                            />
                        ));
                    }}
                </Form.List>

                {isStudent && !disabled
                    ? initialData
                        ? <Button
                            type="primary"
                            onClick={() => solutionId && deleteSolution(solutionId)}
                            className={styles.button}
                        >
                            Удалить решение
                        </Button>
                        : <Button
                            type="primary"
                            className={styles.button}
                            htmlType="submit"
                        >
                        Сдать
                        </Button>
                    : null}
            </Flex>
        </Form>
    );
});
