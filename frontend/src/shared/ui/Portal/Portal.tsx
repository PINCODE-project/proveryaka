import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { typedMemo } from '@shared/lib';

export type Props = PropsWithChildren & Readonly<{
    element?: HTMLElement;
}>;

/**
 * Портал для встраивания контента
 */
export const Portal: FC<Props> = typedMemo(function Portal({
    children,
    element = document.querySelector('#portal')!,
}) {
    if (!element) {
        return null;
    }
    return createPortal(children, element);
});
