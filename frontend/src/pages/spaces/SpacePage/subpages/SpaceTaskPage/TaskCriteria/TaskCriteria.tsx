import { FC, useState } from 'react';

import { TaskCriteriaItem } from '@pages/spaces/SpacePage/subpages/SpaceTaskPage/TaskCriteria/TaskCriteriaItem';

import { GetCriteriaResponse } from '@entities/criteria';
import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { GetIssueResponse } from '@entities/issue';

import { useListFilters } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, SolutionExample, Text } from '@shared/ui';

import styles from './TaskCriteria.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: GetCriteriaResponse[];
    issue: GetIssueResponse;
}>;

export const TaskCriteria: FC<Props> = typedMemo(function TaskCriteria({
    className,
    issue,
    'data-testid': dataTestId = 'TaskCriteria',
}) {
    const [filters] = useListFilters({ count: 15, page: 0 });
    const { data: criteria } = useGetIssueCriteria(issue.id, filters);

    if (!criteria) {
        return null;
    }
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {
                criteria.entityList?.map(item => (
                    <TaskCriteriaItem criteria={item} key={item.id} />
                ))
            }
        </FlexContainer>
    );
});
