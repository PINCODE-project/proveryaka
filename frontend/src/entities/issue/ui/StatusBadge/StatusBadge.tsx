import { Tag } from 'antd';
import { FC } from 'react';

import { IssueStringStatus, Status } from '@entities/issue/model/Status';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: Status;
}>;

export const StatusBadge: FC<Props> = typedMemo(function StatusBadge({ status }) {
    const text = IssueStringStatus[status];

    if (!text) {
        return null;
    }
    return (
        <Tag>
            {text}
        </Tag>
    );
});
