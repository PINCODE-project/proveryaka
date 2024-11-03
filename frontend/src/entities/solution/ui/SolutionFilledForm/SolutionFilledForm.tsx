import { Flex, Input, Typography } from 'antd';
import { FC } from 'react';

import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { DownloadFileButton } from '@shared/ui/DownloadFileButton';

import styles from './SolutionFilledForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    form: GetSolutionValue;
}>;

export const SolutionFilledForm: FC<Props> = typedMemo(function SolutionFilledForm({
    form,
}) {
    return (
        <Flex vertical gap={15} style={{ margin: 0, padding: 0 }}>
            <Flex vertical gap={7}>
                <Typography.Title level={5} className={styles.typography}>
                    {form.name}{' '}
                    {
                        !form.isRequired
                            ? <Typography.Text
                                className={styles.typography}
                                type="secondary"
                            >
                                (необязательно)
                            </Typography.Text>
                            : null
                    }
                </Typography.Title>
                <Typography.Text className={styles.typography}>
                    {form.description}
                </Typography.Text>
            </Flex>
            {
                form.formSolutionType === 1 &&
                <Input.TextArea
                    value={form.textValue!}
                    autoSize={true}
                    placeholder="Здесь должен был быть текст, но его не написали 🥲"
                />
            }
            {
                form.formSolutionType === 2 &&
                form.fileIdList?.map(fileId => (
                    <DownloadFileButton
                        fileId={fileId}
                        key={`file${fileId}`}
                        microservice={'solution'}
                    />
                ))
            }
            {
                form.formSolutionType === 2 &&
                !form.fileIdList?.length &&
                <Typography className={styles.typography}>Нет прикреплённых файлов 🥲</Typography>
            }
            {
                form.formSolutionType === 3 &&
                <>
                    <Input.TextArea
                        value={form.textValue!}
                        autoSize={true}
                        placeholder="Здесь должен был быть текст, но его не вставили 🥲"
                    />
                    {
                        form.fileIdList?.map(fileId => (
                            <DownloadFileButton
                                fileId={fileId}
                                key={`file${fileId}`}
                                microservice={'solution'}
                            />
                        ))
                    }
                </>
            }
        </Flex>
    );
});
