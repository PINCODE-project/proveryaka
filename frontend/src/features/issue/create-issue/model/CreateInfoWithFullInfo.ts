import { CreateCriteriaRequest } from '@entities/criteria';
import { ExampleResponse } from '@entities/example/common';
import { GetIssueResponse } from '@entities/issue';
import { GetIssueFormResponse } from '@entities/issue/model/GetIssueFormResponse';

export type CreateInfoWithFullInfo =
    Omit<GetIssueResponse, 'id'> &
    {
        issueExampleList: Omit<ExampleResponse, 'id'>[];
        criteriaList: (Omit<CreateCriteriaRequest, 'issueId'> & {
            criteriaExampleList: Omit<ExampleResponse, 'id'>[];
        })[];
        issueFormList: Omit<GetIssueFormResponse, 'id' | 'issueId'>[];
    };
