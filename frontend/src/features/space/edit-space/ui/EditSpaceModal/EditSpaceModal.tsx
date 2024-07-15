import { Modal } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey, SpaceSettingsForm } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';
import { useGetSpace } from '@entities/space/lib/useGetSpace';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './EditSpaceModal.module.css';
import { useEditSpace } from '../../lib/useEditSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => {};
    spaceId: string;
}>;

export const EditSpaceModal: FC<Props> = typedMemo(function EditSpaceModal({
    className,
    triggerElement,
    spaceId,
    'data-testid': dataTestId = 'EditSpaceModal',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(isOpen => !isOpen), []);
    const { data: space } = useGetSpace(spaceId);

    const queryClient = useQueryClient();
    const { mutate: edit } = useEditSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId));
        },
    });

    return (
        <>
            {triggerElement(toggleIsOpen)}
            <Modal
                className={getBemClasses(styles, null, null, className)}
                onClose={toggleIsOpen}
                open={isOpen}
                footer={null}
            >
                <Text className={getBemClasses(styles, 'title')}>
                    Изменить пространство
                </Text>
                <SpaceSettingsForm
                    submitText="Изменить пространство"
                    form={space}
                    onSubmit={edit}
                />
            </Modal>
        </>
    );
});
