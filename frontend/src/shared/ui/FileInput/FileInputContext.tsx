import { createContext, MouseEventHandler, PropsWithChildren, useContext, useMemo } from 'react';

import { typedMemo } from '@shared/lib';

export type FileInputContextProps = {
    /**
     * Ссылка на файл
     */
    fileUrl: string | null;

    /**
     * Метод очистки поля
     */
    onClear: MouseEventHandler<HTMLButtonElement>;

    /**
     * Название файла
     */
    fileName: string | null;

    /**
     * Заблокировано ли поле
     */
    disabled: boolean;
};

export const FileInputContext = createContext<FileInputContextProps | null>(null);

export const useFileInputContext = (): FileInputContextProps => {
    const context = useContext(FileInputContext);

    if (context == null) {
        throw new Error('Used SelectContext without provider or before it');
    }

    return context;
};

export type FileInputContextProviderProps = PropsWithChildren & {
    /**
     * Ссылка на файл
     */
    fileUrl: string | null;

    /**
     * Метод очистки поля
     */
    onClear: MouseEventHandler<HTMLButtonElement>;

    /**
     * Заблокировано ли поле
     */
    disabled: boolean;
};

export const FileInputContextProvider = typedMemo(
    function FileInputContextProvider({ children, fileUrl, onClear, disabled }: FileInputContextProviderProps) {
        const fileName = useMemo(() => {
            if (!fileUrl) {
                return null;
            }

            const parts = fileUrl.split('/');
            return parts[parts.length - 1];
        }, [fileUrl]);

        return (
            <FileInputContext.Provider
                value={{
                    fileUrl,
                    onClear,
                    fileName,
                    disabled,
                }}
            >
                {children}
            </FileInputContext.Provider>
        );
    },
);
