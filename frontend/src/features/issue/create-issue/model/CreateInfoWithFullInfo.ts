import { CreateCriteriaRequest } from '@entities/criteria';
import { ExampleResponse } from '@entities/example/common';
import { GetIssueResponse } from '@entities/issue';

export type CreateInfoWithFullInfo =
    Omit<GetIssueResponse, 'id'> &
    {
        issueExampleList: Omit<ExampleResponse, 'id'>[];
        criteriaList: (Omit<CreateCriteriaRequest, 'issueId'> & {
            criteriaExampleList: Omit<ExampleResponse, 'id'>[];
        })[];
    };
