import { Modal } from 'antd';
import { isAxiosError } from 'axios';
import { FC, ReactNode, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { getSpacesQueryKey } from '@entities/space';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, Input } from '@shared/ui';

import styles from './EnterSpaceByCodeModal.module.css';
import { useEnterByCode } from '../../lib/useEnterByCode';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
}>;

export const EnterSpaceByCodeModal: FC<Props> = typedMemo(function EnterSpaceByCodeModal({
    triggerElement,
    className,
    'data-testid': dataTestId = 'EnterSpaceByCodeModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const { mutate: enter } = useEnterByCode({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            setIsOpen(false);
        },
        onError: error => {
            if (!isAxiosError(error) || !error.response?.data) {
                return;
            }

            const { message } = error.response.data as {message: string | null} ?? null;
            if (message) {
                toast.error(message);
            }
        },
    });

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
                destroyOnClose
                title="Вход по пригласительному коду"
            >
                <Input
                    value={inviteCode}
                    onChange={event => setInviteCode(event.target.value)}
                    onBlur={event => setInviteCode(event.target.value.trim())}
                />
                <Button
                    onClick={() => enter(inviteCode)}
                    disabled={inviteCode.trim().length === 0}
                    className={getBemClasses(styles, 'submitButton')}
                >
                    Войти
                </Button>
            </Modal>
        </>
    );
});
