import { UploadChangeParam } from 'antd/es/upload/interface';
import { createContext, PropsWithChildren, useContext } from 'react';

import { typedMemo } from '@shared/lib';

export type FileInputContextProps = {
    onChange: (info: UploadChangeParam) => void;
};

export const FileInputContext = createContext<FileInputContextProps | null>(null);

export const useFileInputContext = (): FileInputContextProps => {
    const context = useContext(FileInputContext);

    if (context == null) {
        throw new Error('Used FileInputContext without provider or before it');
    }

    return context;
};

export type FileInputContextProviderProps = PropsWithChildren & FileInputContextProps;

export const FileInputContextProvider = typedMemo(
    function FileInputContextProvider({
        onChange,
        children,
    }: FileInputContextProviderProps) {
        return (
            <FileInputContext.Provider
                value={{
                    onChange,
                }}
            >
                {children}
            </FileInputContext.Provider>
        );
    },
);
