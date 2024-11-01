import { ListFilters } from '@shared/types';

import { DistributedType } from './DistributedType';
import { IssueStatus } from './IssueStatus';

export type GetIssueFilters = ListFilters & {
    isDistributed: DistributedType;
    search: string;
    status: IssueStatus | null;
};
