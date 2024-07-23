import { ExampleResponse } from '@entities/example/common';

export type GetIssueExample = ExampleResponse & {
    issueId: string;
};
