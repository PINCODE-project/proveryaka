import { FC } from 'react';

import { TaskCriteriaItem } from '@pages/spaces/SpacePage/subpages/SpaceTaskPage/TaskCriteria/TaskCriteriaItem';

import { GetCriteriaResponse } from '@entities/criteria';
import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { GetIssueResponse } from '@entities/issue';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

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
    const { data: criteria } = useGetIssueCriteria(issue.id);

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
