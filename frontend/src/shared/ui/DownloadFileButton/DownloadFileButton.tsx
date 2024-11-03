import { DownloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { FC, useMemo } from 'react';

import { downloadFileByUrl, typedMemo, useGetEstimateFile, useGetSolutionFile } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './DownloadFileButton.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    fileId: string;
    microservice: 'estimate' | 'solution';
}>;

export const DownloadFileButton: FC<Props> = typedMemo(function DownloadFileButton({
    fileId,
    microservice,
}) {
    const { data: estimateFile } = useGetEstimateFile(fileId, {
        enabled: microservice === 'estimate',
    });
    const { data: solutionFile } = useGetSolutionFile(fileId, {
        enabled: microservice === 'solution',
    });
    const file = estimateFile || solutionFile;
    const fileUrl = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);
    const imageRegex = /.*\.(png|jpg|webp|jpeg)$/;

    if (!file || !fileUrl) {
        return <Typography className={styles.error}>Не удалось загрузить файл</Typography>;
    }
    if (imageRegex.test(file.name)) {
        return <img src={fileUrl} className={styles.image} />;
    }
    return (<Button
        icon={<DownloadOutlined />}
        type="default"
        onClick={() => downloadFileByUrl(fileUrl, file.name)}
    >
        {file.name}
    </Button>);
});
