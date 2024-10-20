import { ConfigRouteProps } from '@shared/types';

import { SpaceIssuePage } from './SpaceIssuePage';
import { SpaceIssueCriteria } from './SpaceIssuePage/subpages/SpaceIssueCriteria';
import { SpaceIssueDescription } from './SpaceIssuePage/subpages/SpaceIssueDescription';
import { SpaceIssueMaterials } from './SpaceIssuePage/subpages/SpaceIssueMaterials';
import { SpacePage } from './SpacePage';
import { SpaceDescription } from './SpacePage/subpages/SpaceDescription';
import { SpaceSolutionsPage } from './SpacePage/subpages/SpaceSolutionsPage';
import { SpaceTeamsPage } from './SpacePage/subpages/SpaceTeamsPage';
import { SpaceUsersPage } from './SpacePage/subpages/SpaceUsersPage';
import { SpaceSolutionPage } from './SpaceSolutionPage';
import { SpaceSolutionMarksPage } from './SpaceSolutionPage/subpages/SpaceSolutionMarksPage';
import { SpacesPage } from './SpacesPage';

export const SpaceRouter = {
    Spaces: '/spaces',
    Space: (id: string) => `/spaces/${id}`,
    SpaceTasks: (id: string) => `/spaces/${id}/tasks`,
    SpaceDescription: (id: string) => `/spaces/${id}/description`,
    SpaceSolutions: (id: string) => `/spaces/${id}/solutions`,
    SpaceUsers: (id: string) => `/spaces/${id}/users`,
    SpaceTeams: (id: string) => `/spaces/${id}/teams`,
    SpaceSolution: (spaceId: string, solutionId: string) => `/spaces/${spaceId}/solutions/${solutionId}`,
    SpaceSolutionCommon: (spaceId: string, solutionId: string) => `/spaces/${spaceId}/solutions/${solutionId}/common`,
    SpaceSolutionMarks: (spaceId: string, solutionId: string) => `/spaces/${spaceId}/solutions/${solutionId}/mark`,
    SpaceSolutionFeedback: (spaceId: string, solutionId: string) => `/spaces/${spaceId}/solutions/${solutionId}/feedback`,
    SpaceIssue: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}`,
    SpaceIssueDescription: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}/description`,
    SpaceIssueMaterials: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}/materials`,
    SpaceIssueCriteria: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}/criteria`,
    SpaceIssueForm: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}/form`,
    SpaceIssueMarks: (spaceId: string, issueId: string) => `/spaces/${spaceId}/tasks/${issueId}/marks`,
};

export const spaceRouteConfig: ConfigRouteProps[] = [
    {
        path: SpaceRouter.Spaces,
        withAuthGuard: true,
        element: <SpacesPage />,
    },
    {
        path: SpaceRouter.Space(':spaceId'),
        withAuthGuard: true,
        element: <SpacePage />,
        children: [
            {
                path: SpaceRouter.SpaceDescription(':spaceId'),
                element: <SpaceDescription />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceTasks(':spaceId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceSolutions(':spaceId'),
                element: <SpaceSolutionsPage />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceUsers(':spaceId'),
                element: <SpaceUsersPage />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceTeams(':spaceId'),
                element: <SpaceTeamsPage />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.Space(':spaceId'),
                element: null,
                withAuthGuard: true,
            },
        ],
    },
    {
        path: SpaceRouter.SpaceSolution(':spaceId', ':solutionId'),
        withAuthGuard: true,
        element: <SpaceSolutionPage />,
        children: [
            {
                path: SpaceRouter.SpaceSolutionCommon(':spaceId', ':solutionId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceSolutionMarks(':spaceId', ':solutionId'),
                element: <SpaceSolutionMarksPage />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceSolutionFeedback(':spaceId', ':solutionId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceSolution(':spaceId', ':solutionId'),
                element: null,
                withAuthGuard: true,
            },
        ],
    },
    {
        path: SpaceRouter.SpaceIssue(':spaceId', ':issueId'),
        element: <SpaceIssuePage />,
        withAuthGuard: true,
        children: [
            {
                path: SpaceRouter.SpaceIssueDescription(':spaceId', ':issueId'),
                element: <SpaceIssueDescription />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceIssueMaterials(':spaceId', ':issueId'),
                element: <SpaceIssueMaterials />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceIssueCriteria(':spaceId', ':issueId'),
                element: <SpaceIssueCriteria />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceIssueForm(':spaceId', ':issueId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceIssueMarks(':spaceId', ':issueId'),
                element: <SpaceIssueMarks />,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceIssue(':spaceId', ':issueId'),
                element: null,
                withAuthGuard: true,
            },
        ],
    },
];
