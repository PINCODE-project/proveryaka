import { notification } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import { useDeleteSpace } from '../../lib/useDeleteSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onDelete: () => void) => ReactNode;
    onSuccess?: () => void;
    spaceId: string;
    spaceName: string;
}>;

export const DeleteSpaceButton: FC<Props> = typedMemo(function DeleteSpaceButton({
    triggerComponent,
    spaceId,
    spaceName,
    onSuccess,
}) {
    const queryClient = useQueryClient();
    const [notify, contextHolder] = notification.useNotification();

    const { mutate: deleteSpace, isLoading } = useDeleteSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId ?? ''));
            notify.success({
                message: 'Пространство удалено',
            });
            onSuccess?.();
        },
    });

    const onDelete = useCallback(async () => {
        if (isLoading) {
            return;
        }

        const canDelete = await customConfirm({
            title: 'Удалить пространство',
            text: <>Вы уверены, что хотите удалить пространство <b>{spaceName}</b>?  </>,
        });

        if (!canDelete) {
            return;
        }

        deleteSpace(spaceId);
    },
    [spaceId, deleteSpace, isLoading]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onDelete)}
        </>
    );
});
