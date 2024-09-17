import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { FC, useCallback, MouseEvent } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './ImagePreview.module.css';
import { useFileInputContext } from '../FileInputContext';

export type Props = ClassNameProps & TestProps & Readonly<{
    file: File | null;
}>;

export const ImagePreview: FC<Props> = typedMemo(function ImagePreview({
    file,
}) {
    const { onChange } = useFileInputContext();

    const onDelete = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        onChange({ fileList: [], file: { status: 'removed', uid: '-1', name: '' } } as UploadChangeParam);
    }, [onChange]);

    return (
        <div className={styles.imagePreview}>
            <Flex align="center" justify="center" className={styles.backdrop}>
                <Button onClick={onDelete} className={styles.deleteButton} type="text">
                    <DeleteOutlined className={styles.deleteButtonIcon} />
                </Button>
            </Flex>
            <img
                src={file ? URL.createObjectURL(file) : ''}
                alt="avatar"
                className={styles.avatarIcon}
            />
        </div>
    );
});
