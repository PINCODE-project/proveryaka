import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, GetProp, Upload, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { FC, ReactNode, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps } from '@shared/types';

import styles from './FileInput.module.css';
import { FileInputContextProvider } from './FileInputContext';

export type Props = ClassNameProps & UploadProps & {
    isEmpty?: boolean;
    filledComponent?: ReactNode;
    emptyText?: string;
    onChangeFile?: (file: File | null) => void;
    isButton: boolean;
};

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const FileInput: FC<Props> = typedMemo(function FileInput({
    isButton,
    isEmpty,
    emptyText,
    onChangeFile,
    filledComponent,
    onChange,
    ...uploadProps
}) {
    const [loading, setLoading] = useState(false);

    const getBase64 = useCallback((img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }, []);

    const convertBase64ToFile = useCallback((base64: string, filename = 'file') => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }, []);

    const handleChange: UploadProps['onChange'] = useCallback((info: UploadChangeParam) => {
        onChange?.(info);

        if (info.file.status === 'uploading') {
            setLoading(true);
        } else if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, url => {
                const file = convertBase64ToFile(url, info.file.name);
                onChangeFile?.(file);
            });
            setLoading(false);
        } else if (info.file.status === 'removed') {
            onChangeFile?.(null);
            setLoading(false);
        }
    }, [onChangeFile, convertBase64ToFile, getBase64, onChange]);

    const dummyRequest = useCallback<Exclude<UploadProps['customRequest'], undefined>>(({ onSuccess }) => {
        setTimeout(() => {
            onSuccess?.('ok');
        }, 0);
    }, []);

    return (
        <FileInputContextProvider onChange={handleChange}>
            <Upload
                {...uploadProps}
                onChange={handleChange}
                customRequest={dummyRequest}
                className={styles.upload}
            >
                {
                    isEmpty
                        ? (isButton
                            ? <Button icon={loading ? <LoadingOutlined /> : <PlusOutlined />}>
                                {emptyText}
                            </Button>
                            : <button style={{ border: 0, background: 'none' }} type="button">
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>{emptyText}</div>
                            </button>)
                        : filledComponent
                }
            </Upload>
        </FileInputContextProvider>
    );
});
