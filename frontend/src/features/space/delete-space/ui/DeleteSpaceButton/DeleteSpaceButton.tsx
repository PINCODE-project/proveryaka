import { notification } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { useDeleteSpace } from '../../lib/useDeleteSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onDelete: () => void) => ReactNode;
    onSuccess?: () => void;
    spaceId: string;
}>;

export const DeleteSpaceButton: FC<Props> = typedMemo(function DeleteSpaceButton({
    triggerComponent,
    spaceId,
    onSuccess,
}) {
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    const { mutate: deleteSpace, isLoading } = useDeleteSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId ?? ''));
            api.success({
                message: 'Пространство удалено',
            });
            onSuccess?.();
        },
    });

    const onDelete = useCallback(() => !isLoading && deleteSpace(spaceId),
        [spaceId, deleteSpace, isLoading]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onDelete)}
        </>
    );
});
