import { Flex, Form, Input, Typography } from 'antd';
import { FC, useCallback, useState } from 'react';

// eslint-disable-next-line
import {CreateSolution} from "@features/solution/create-solution/model/CreateSolution";

import { FormSolutionType } from '@entities/issue/model/FormSolutionType';

import { getFormItemUploadNotFileValue, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput, ImagePreview } from '@shared/ui';

import styles from './IssueForm.module.css';
import { GetIssueFormResponse } from '../../model/GetIssueFormResponse';

export type Props = ClassNameProps & TestProps & Readonly<{
    formList: GetIssueFormResponse[];
    initialValue: CreateSolution;
    onSubmit?: (value: CreateSolution) => void;
    disabled?: boolean;
}>;

export const IssueForm: FC<Props> = typedMemo(function IssueForm({
    initialValue,
    formList,
    onSubmit,
    disabled,
}) {
    const [files, setFiles] = useState<Map<number, File>>(new Map());

    const onChangeFile = useCallback((file: File | null, index: number) => {
        const newFiles = new Map(files);
        if (file) {
            newFiles.set(index, file);
        } else {
            newFiles.delete(index);
        }

        setFiles(newFiles);
    }, [files]);

    return (
        <Form
            name="IssueForm"
            disabled={disabled}
            initialValues={initialValue}
            onFinish={onSubmit}
        >
            <Flex gap={36} vertical>
                {formList.map((item, index) => (
                    <Flex vertical gap={24}>
                        <Flex vertical gap={12}>
                            <Typography.Text className={styles.name}>
                                {item.name}
                            </Typography.Text>
                            <Typography.Text className={styles.description}>
                                {item.description}
                            </Typography.Text>
                        </Flex>

                        {
                            item.formSolutionType === FormSolutionType.Text
                                ? <Form.Item
                                    key={index}
                                    name={['solutionValueList', index, 'textValue']}
                                >
                                    <Input.TextArea
                                        placeholder="Введите текст"
                                    />
                                </Form.Item>
                                : <Form.Item
                                    key={index}
                                    getValueFromEvent={getFormItemUploadNotFileValue}
                                >
                                    <FileInput
                                        isEmpty={!files.get(index)}
                                        multiple={false}
                                        maxCount={1}
                                        filledComponent={'aaa'}
                                        onChangeFile={file => onChangeFile(file, index)}
                                    />
                                </Form.Item>
                        }
                    </Flex>
                ))}
            </Flex>
        </Form>
    );
});
