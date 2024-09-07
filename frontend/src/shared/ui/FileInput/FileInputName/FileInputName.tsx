import { Button, Image, Tooltip, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Cross from '@shared/assets/icons/Cross.svg';
import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './FileInputName.module.css';
import { useFileInputContext } from '../FileInputContext';

export type Props = ClassNameProps & TestProps & Readonly<{
    /**
     * Тип содержимого подсказки
     */
    tooltipType: 'name' | 'image';

    /**
     * Класс обертки
     */
    wrapperClassName?: string;
}>;

/**
 * Отображение выбранного файла в виде имени файла
 */
export const FileInputName: FC<Props> = typedMemo(function FileInputName({
    tooltipType,
    className,
    wrapperClassName,
    'data-testid': dataTestId = 'FileInputName',
}) {
    const { t } = useTranslation([Namespace.Common.ns]);
    const { fileName, onClear, fileUrl, disabled } = useFileInputContext();

    const tooltipImage = useCallback(() => {
        return (
            <div className={getBemClasses(styles, 'imageTooltip')}>
                <Image
                    src={fileUrl!}
                    alt={t('fileinput_image', Namespace.Common)}
                    className={getBemClasses(styles, 'image')}
                />
            </div>
        );
    }, [fileUrl, t]);

    function downloadURI() {
        if (!fileUrl) {
            return;
        }
        const link = document.createElement('a');
        link.download = fileName ?? '';
        link.href = fileUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div
            onClick={() => disabled && downloadURI()}
            className={getBemClasses(styles, 'wrapper', null, wrapperClassName)}
        >
            <Tooltip
                title={tooltipType === 'image' ? undefined : disabled ? 'Скачать' : fileName!}
            >
                <div
                    className={getBemClasses(styles, null, { disabled }, className)}
                    data-testid={dataTestId}
                >
                    <Typography.Text className={getBemClasses(styles, 'name')}>
                        {fileName}
                    </Typography.Text>
                </div>
            </Tooltip>
            {!disabled && <Button
                onClick={onClear}
                className={getBemClasses(styles, 'clearButton')}
                data-testid={`${dataTestId}.clearButton`}
                size="small"
            >
                <Cross className={getBemClasses(styles, 'clearButtonIcon')} />
            </Button>}
        </div>
    );
});
