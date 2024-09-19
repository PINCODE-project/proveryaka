import { notification } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import { useExitUser } from '../../lib/useExitUser';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    spaceName: string;
    onSuccess?: () => void;
    triggerComponent: (onExit: () => void) => ReactNode;
}>;

export const ExitUserButton: FC<Props> = typedMemo(function ExitUserButton({
    triggerComponent,
    spaceId,
    spaceName,
    onSuccess,
}) {
    const queryClient = useQueryClient();
    const [notify, contextHolder] = notification.useNotification();
    const { mutate: exit, isLoading } = useExitUser({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId));
            notify.success({
                message: 'Вы покинули пространство',
            });
            onSuccess?.();
        },
    });

    const onExit = useCallback(async () => {
        if (isLoading) {
            return;
        }

        const canExit = await customConfirm({
            title: 'Покинуть пространство',
            text: <>Вы уверены, что хотите покинуть пространство <b>{spaceName}</b>?</>,
        });

        if (!canExit) {
            return;
        }

        !isLoading && exit(spaceId);
    }, [spaceId, exit, isLoading, spaceName]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onExit)}
        </>
    );
});
