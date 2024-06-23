import { startTransition } from 'react';
import { createRoot } from 'react-dom/client';

import { Confirm, Props as ConfirmProps } from './Confirm';

export type Props = Omit<ConfirmProps, 'giveAnswer'> & {
    confirmRootInner?: Element;
};

/**
 * Вызов окна подтверждения.
 * @param props
 */
export const customConfirm = (props: Props): Promise<boolean> => {
    const confirmRoot = props.confirmRootInner ?? document.querySelector('#confirm-portal');
    const root = createRoot(confirmRoot!);

    return new Promise(resolve => {
        const giveAnswer = (answer: boolean) => {
            root.unmount();
            resolve(answer);
        };

        startTransition(() => {
            root.render(<Confirm giveAnswer={giveAnswer} {...props} />);
        });
    });
};
