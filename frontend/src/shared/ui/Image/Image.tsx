import { DetailedHTMLProps, FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { TestProps } from '@shared/types';

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & TestProps &
    Readonly<{
        src?: string | null;
        alt: string;
        placeholderSrc?: string;
    }>;
/**
 * Изображение с плейсхолдерным изображением
 */
export const Image: FC<Props> = typedMemo(function Image({
    src,
    placeholderSrc,
    'data-testid': dataTestId = 'Image',
    ...props
}) {
    const [currentSrc, setCurrentSrc] = useState(src || placeholderSrc);
    const [errored, setErrored] = useState(false);

    const onError = useCallback(() => {
        if (!errored && placeholderSrc) {
            setErrored(true);
            setCurrentSrc(placeholderSrc);
        }
    }, [errored, placeholderSrc]);

    useEffect(() => {
        setCurrentSrc(src || undefined);
        setErrored(false);
    }, [src]);

    return (
        <img
            key={currentSrc}
            src={currentSrc ?? ''}
            onError={onError}
            data-testid={dataTestId}
            {...props}
        />
    );
});
