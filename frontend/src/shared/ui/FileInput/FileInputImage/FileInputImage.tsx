import { Button, Image } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Cross from '@shared/assets/icons/Cross.svg';
import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './FileInputImage.module.css';
import { useFileInputContext } from '../FileInputContext';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

/**
 * Отображение выбранного файла в виде изображения
 */
export const FileInputImage: FC<Props> = typedMemo(function FileInputImage({
    className,
    'data-testid': dataTestId = 'FileInputImage',
    ...imageProps
}) {
    const { t } = useTranslation([Namespace.Common.ns]);
    const { fileUrl, onClear, disabled } = useFileInputContext();

    return (
        <div
            className={getBemClasses(styles, null, { disabled }, className)}
            data-testid={dataTestId}
            {...imageProps}
        >
            <Image
                src={fileUrl!}
                alt={t('fileinput_image', Namespace.Common)}
                className={getBemClasses(styles, 'image')}
            />
            {!disabled && <Button
                onClick={onClear}
                className={getBemClasses(styles, 'clearButton')}
                data-testid={`${dataTestId}.clearButton`}
            >
                <Cross className={getBemClasses(styles, 'clearButtonIcon')} />
            </Button>}
        </div>
    );
});
