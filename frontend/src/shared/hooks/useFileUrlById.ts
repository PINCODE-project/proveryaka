import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { getFileUrl } from '@shared/lib';

type ReturnState = [
    string | null,
    Dispatch<SetStateAction<string | null>>
];

export function useFileUrlById(fileId: string | null): ReturnState {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        (async function() {
            const fileUrl = await getFileUrl(fileId);
            setFileUrl(fileUrl);
        }());
    }, [fileId]);

    return [fileUrl, setFileUrl];
}
