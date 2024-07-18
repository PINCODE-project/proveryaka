import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateSpace } from '@features/space/create-space/lib/useCreateSpace';

import { getSpacesQueryKey, SpaceSettingsForm } from '@entities/space';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './CreateSpaceModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => {};
}>;

export const CreateSpaceModal: FC<Props> = typedMemo(function CreateSpaceModal({
    className,
    triggerElement,
    'data-testid': dataTestId = 'CreateSpaceModal',
}) {
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();
    const { mutate: create } = useCreateSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            setIsOpen(false);
        },
    });

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                className={getBemClasses(styles, null, null, className)}
                onCancel={() => setIsOpen(false)}
                open={isOpen}
                destroyOnClose
                footer={null}
            >
                <Text className={getBemClasses(styles, 'title')}>
                    Создать пространство
                </Text>
                <SpaceSettingsForm
                    submitText="Создать пространство"
                    onSubmit={create}
                />
            </Modal>
        </>
    );
});
