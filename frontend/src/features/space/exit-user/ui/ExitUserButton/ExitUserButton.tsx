import { notification } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { useExitUser } from '../../lib/useExitUser';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    onSuccess?: () => void;
    triggerComponent: (onExit: () => void) => ReactNode;
}>;

export const ExitUserButton: FC<Props> = typedMemo(function ExitUserButton({
    triggerComponent,
    spaceId,
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

    const onExit = useCallback(() => !isLoading && exit(spaceId), [spaceId, exit, isLoading]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onExit)}
        </>
    );
});
