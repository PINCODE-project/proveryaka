import {
    ChangeEventHandler, DragEventHandler,
    FC,
    MouseEventHandler,
    PropsWithChildren,
    useCallback,
    useId,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { InputProps, Text, getFlexContainerStyleClasses } from '@shared/ui';

import styles from './FileInput.module.css';
import { FileInputContextProvider } from './FileInputContext';

export type Props = ClassNameProps & TestProps & InputProps & PropsWithChildren & Readonly<{
    /**
     * Ссылка на выбранный файл
     */
    fileUrl: string | null;

    /**
     * Метод выбора файла
     * @param file выбранный файл
     */
    onChangeFile: (file: File | null) => void;

    /**
     * Максимальный размер файла в Mb
     * @default 0.5
     */
    maxSizeByMb?: number;

    /**
     * Поддерживаемые форматы файлов
     */
    acceptType: string[];
}>;

const ERROR_DISPLAY_TIME = 3000;

const flexContainerStyleClasses = getFlexContainerStyleClasses({
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

/**
 * Поле для выбора файла
 */
export const FileInput: FC<Props> = typedMemo(function FileInput({
    fileUrl,
    onChangeFile,
    maxSizeByMb = 0.5,
    acceptType,
    children,
    placeholder,
    className,
    'data-testid': dataTestId = 'FileInput',
    disabled = false,
    ...inputProps
}) {
    const { t } = useTranslation([Namespace.Common.ns]);
    const id = useId();
    const [error, setError] = useState<string | null>(null);
    const errorTimeout = useRef<ReturnType<typeof setTimeout>>(null);
    const [isDragging, setIsDragging] = useState(false);

    const changeError = useCallback((error: string | null) => {
        setError(error);

        errorTimeout.current && clearTimeout(errorTimeout.current);

        if (error) {
            // @ts-expect-error Нужно переопределять current
            errorTimeout.current = setTimeout(() => {
                // @ts-expect-error Нужно переопределять current
                errorTimeout.current = null;
                setError(null);
            }, ERROR_DISPLAY_TIME);
        }
    }, []);

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        const file = event.target.files?.[0] ?? null;
        const fileNameParts = file?.name.split('.') ?? [null];
        const fileType = fileNameParts[fileNameParts.length - 1];

        if (file && file.size > maxSizeByMb * 1024 * 1024 * 8) {
            changeError(t('warning_file_size', { size: maxSizeByMb }));
        } else if (file && fileType && !acceptType?.includes(`.${fileType}`)) {
            changeError(`${t('warning_file_formats')} ${acceptType.join(', ')}`);
        } else {
            changeError(null);
            file && onChangeFile(file);
        }
    }, [changeError, maxSizeByMb, acceptType, onChangeFile, t]);

    const onClear: MouseEventHandler<HTMLButtonElement> = useCallback(event => {
        event.preventDefault();
        onChangeFile(null);
        changeError(null);
    }, [onChangeFile, changeError]);

    const onDragEnter: DragEventHandler<HTMLInputElement> = useCallback(() => {
        setIsDragging(true);
    }, []);

    const onDragLeave: DragEventHandler<HTMLInputElement> = useCallback(() => {
        setIsDragging(false);
    }, []);

    return (
        <FileInputContextProvider fileUrl={fileUrl} onClear={onClear} disabled={disabled}>
            <label
                htmlFor={id}
                className={getBemClasses(
                    styles,
                    null,
                    { invalid: error !== null, empty: !fileUrl, disabled, isDragging },
                    className,
                    !fileUrl ? flexContainerStyleClasses : null,
                )}
                data-testid={dataTestId}
            >
                <input
                    type="file"
                    id={id}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    accept={acceptType?.join(', ')}
                    className={getBemClasses(styles, 'input')}
                    data-testid={`${dataTestId}.input`}
                    {...inputProps}
                    disabled={disabled}
                    onChange={onChange}
                />

                {
                    fileUrl
                        ? children
                        : <Text
                            className={getBemClasses(styles, 'placeholder')}
                            data-testid={`${dataTestId}.placeholder${error ? '.error' : ''}`}
                        >
                            {error ?? placeholder ?? t('click_or_drag_files')}
                        </Text>
                }
            </label>
        </FileInputContextProvider>
    );
});
