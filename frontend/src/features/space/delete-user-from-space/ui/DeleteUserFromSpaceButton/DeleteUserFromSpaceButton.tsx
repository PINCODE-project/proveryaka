import { notification } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';
import { getSpaceTeamsQueryKey } from '@entities/team';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { useDeleteUserFromSpace } from '../../lib/useDeleteUserFromSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onDelete: () => void) => ReactNode;
    spaceId: string;
    userId: string;
}>;

export const DeleteUserFromSpaceButton: FC<Props> = typedMemo(function DeleteUserFromSpaceButton({
    triggerComponent,
    spaceId,
    userId,
}) {
    const queryClient = useQueryClient();
    const [notify, contextHolder] = notification.useNotification();
    const { mutate: deleteUser, isLoading } = useDeleteUserFromSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            notify.success({
                message: 'Пользователь удаален из пространства',
            });
        },
    });

    const onDelete = useCallback(() => {
        if (isLoading) {
            return;
        }

        deleteUser({ spaceId, userId });
    }, [spaceId, userId, deleteUser, isLoading]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onDelete)}
        </>
    );
});
