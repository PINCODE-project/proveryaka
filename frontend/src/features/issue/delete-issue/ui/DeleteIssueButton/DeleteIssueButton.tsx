import { App, Typography } from 'antd';
import { FC, ReactNode, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { getIssueQueryKey, getSpaceIssueQueryKey } from '@entities/issue';
import { GetIssueFilters } from '@entities/issue/model/GetIssueFilters';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import { useDeleteIssue } from '../../lib/useDeleteIssue';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onDelete: () => void) => ReactNode;
    onSuccess?: () => Promise<void> | void;
    issueId: string;
    spaceId: string;
    issueName: string;
    filters: GetIssueFilters | undefined;
}>;

export const DeleteIssueButton: FC<Props> = typedMemo(function DeleteSpaceButton({
    triggerComponent,
    issueId,
    spaceId,
    issueName,
    onSuccess,
    filters,
}) {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    const { mutate: deleteIssue, isLoading } = useDeleteIssue({
        onSuccess: async () => {
            await onSuccess?.();

            await queryClient.invalidateQueries(getSpaceIssueQueryKey(spaceId, filters));
            await queryClient.invalidateQueries(getIssueQueryKey(issueId ?? ''));
            notification.success({
                message: 'Удаление задания',
                description: (
                    <Typography.Text>
                        Задание <Typography.Text strong>{issueName}</Typography.Text> удалено
                    </Typography.Text>
                ),
            });
        },
    });

    const onDelete = useCallback(async () => {
        if (isLoading) {
            return;
        }

        const canDelete = await customConfirm({
            title: 'Удалить пространство',
            text: <>Вы уверены, что хотите удалить задание <b>{issueName}</b>? </>,
        });

        if (!canDelete) {
            return;
        }

        deleteIssue(issueId);
    },
    [issueId, deleteIssue, isLoading, issueName]);

    return triggerComponent(onDelete);
});
