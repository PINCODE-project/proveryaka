import { DownloadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { FC, useMemo } from 'react';

import { downloadFileByUrl, typedMemo, useGetEstimateFile } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './MaterialFile.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    fileId: string;
}>;

export const MaterialFile: FC<Props> = typedMemo(function MaterialFile({
    fileId,
}) {
    const { data: file } = useGetEstimateFile(fileId);
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
