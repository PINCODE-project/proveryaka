import { notification, Popconfirm } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';
import { getSpaceTeamsQueryKey } from '@entities/team';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import { useDeleteUserFromSpace } from '../../lib/useDeleteUserFromSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onDelete: () => void) => ReactNode;
    spaceId: string;
    userId: string;
    userFullName: string;
}>;

export const DeleteUserFromSpaceButton: FC<Props> = typedMemo(function DeleteUserFromSpaceButton({
    triggerComponent,
    spaceId,
    userId,
    userFullName,
}) {
    const queryClient = useQueryClient();
    const [notify, contextHolder] = notification.useNotification();
    const { mutate: deleteUser, isLoading } = useDeleteUserFromSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            notify.success({
                message: 'Пользователь удален из пространства',
            });
        },
    });

    const onDelete = useCallback(async () => {
        if (isLoading) {
            return;
        }

        const canDelete = await customConfirm({
            title: 'Удалить из пространства',
            text: <>Вы уверены, что хотите удалить <b>{userFullName}</b> из пространства?</>,
        });

        if (!canDelete) {
            return;
        }

        deleteUser({ spaceId, userId });
    }, [spaceId, userId, deleteUser, isLoading, userFullName]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onDelete)}
        </>
    );
});
