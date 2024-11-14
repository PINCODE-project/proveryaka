import { ListFilters } from '@shared/types';

import { DistributedType } from './DistributedType';
import { Status } from './Status';

export type GetIssueFilters = ListFilters & {
    isDistributed: DistributedType;
    search: string;
    status: Status | null;
    isPublished: boolean | null;
};
