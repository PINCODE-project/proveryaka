import { FC } from 'react';

import { CriteriaTable } from '@entities/criteria';

import { useIssueId } from '@shared/hooks';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceIssueCriteria: FC<Props> = typedMemo(function SpaceIssueCriteria() {
    const issueId = useIssueId();

    if (!issueId) {
        return null;
    }
    return (
        <CriteriaTable issueId={issueId ?? ''} />
    );
});
