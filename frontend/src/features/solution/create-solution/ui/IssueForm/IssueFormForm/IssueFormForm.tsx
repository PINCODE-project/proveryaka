import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { FC, useCallback, useMemo } from 'react';

import { FormSolutionType } from '@entities/issue/model/FormSolutionType';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput } from '@shared/ui';
import { DownloadFileButton } from '@shared/ui/DownloadFileButton';
import { FileType } from '@shared/ui/FileInput/FileInput';

import styles from './IssueFormForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    order: number;
    disabled?: boolean;
}>;

export const IssueFormForm: FC<Props> = typedMemo(function IssueFormForm({
    order,
    disabled,
}) {
    const form = Form.useFormInstance();
    const item: GetSolutionValue | undefined = Form.useWatch(['solutionValueList', order], form);

    const onChangeFile = useCallback((file: File | null) => {
        form.setFieldValue(['solutionValueList', order, 'file'], file);
        form.validateFields();
    }, [form, order]);

    const beforeUpload = useCallback((file: FileType) => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Файл должен быть меньше 5Мб');
        }
        return isLt5M;
    }, []);

    const textInput = useMemo(() => (
        <Input.TextArea placeholder="Введите текст" disabled={disabled} autoSize
            className={styles.textarea}
        />
    ), [disabled]);

    const fileInput = useMemo(() => (
        <FileInput
            disabled={disabled}
            beforeUpload={beforeUpload}
            showUploadList={false}
            isEmpty={!item?.file}
            filledComponent={
                <Flex gap={12} align="center">
                    <DownloadFileButton file={item?.file ?? undefined} enableImageShow={false} />
                    {!disabled && <Button
                        icon={<DeleteOutlined />}
                        onClick={event => {
                            event.stopPropagation();
                            !disabled && onChangeFile(null);
                        }}
                        variant="text"
                    />}
                </Flex>
            }
            onChangeFile={onChangeFile}
            emptyText="Загрузите файл"
            isButton
        />
    ), [beforeUpload, item?.file, onChangeFile, disabled]);

    const input = useMemo(() => {
        if (item?.formSolutionType === FormSolutionType.Text) {
            return (
                <Form.Item
                    className={styles.formItem}
                    name={[order, 'textValue']}
                    isListField
                    rules={[
                        { required: item.isRequired, message: 'Введите текст' },
                    ]}
                >
                    {textInput}
                </Form.Item>
            );
        }
        if (item?.formSolutionType === FormSolutionType.File) {
            return (
                <Form.Item
                    className={styles.formItem}
                    name={[order, 'fileAdditional']}
                    isListField
                    rules={[
                        ({ getFieldValue }) => ({
                            validator() {
                                if (!item?.isRequired || getFieldValue(['solutionValueList', order, 'file'])) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Загрузите файл'));
                            },
                        }),
                    ]}
                >
                    {fileInput}
                </Form.Item>
            );
        }
        if (item?.formSolutionType === FormSolutionType.FileOrText) {
            return (
                <Flex vertical gap={12}>
                    <Form.Item
                        className={styles.formItem}
                        name={[order, 'textValue']}
                        isListField
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !item.isRequired ||
                                        value ||
                                        getFieldValue(['solutionValueList', order, 'file'])
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(''));
                                },
                            }),
                        ]}
                    >
                        {textInput}
                    </Form.Item>
                    <Typography>или</Typography>
                    <Form.Item
                        className={styles.formItem}
                        name={[order, 'fileAdditional']}
                        isListField
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !item.isRequired ||
                                        value ||
                                        getFieldValue(['solutionValueList', order, 'textValue'])
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Введите текст или загрузите файл'));
                                },
                            }),
                        ]}
                    >
                        {fileInput}
                    </Form.Item>
                </Flex>
            );
        }
    }, [item, textInput, fileInput, order]);

    return (
        <Flex gap={20} vertical>
            <Flex gap={12} vertical>
                <Typography.Text className={styles.title}>
                    {item?.name}

                    {!item?.isRequired
                        ? <Typography.Text className={styles.optional}> (необязательно)</Typography.Text>
                        : null}
                </Typography.Text>

                {item?.description ? <Typography>{item.description}</Typography> : null}
            </Flex>

            {input}
        </Flex>
    );
});
