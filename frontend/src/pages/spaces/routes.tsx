import { SpaceCreateReviewPage } from '@pages/spaces/SpacePage/subpages/SpaceCreateReviewPage';
import { SpaceEngineeringWorksPage } from '@pages/spaces/SpacePage/subpages/SpaceEngineeringWorksPage';
import { SpaceSolutionPage } from '@pages/spaces/SpacePage/subpages/SpaceSolutionPage';
import { SpaceSolutionsPage } from '@pages/spaces/SpacePage/subpages/SpaceSolutionsPage/SpaceSolutionsPage';
import { SpaceTaskPage } from '@pages/spaces/SpacePage/subpages/SpaceTaskPage';
import { SpaceTeamPage } from '@pages/spaces/SpacePage/subpages/SpaceTeamPage/SpaceTeamPage';

import { ConfigRouteProps } from '@shared/types';

import { RedirectToTasks } from './components/RedirectToTasks';
import { SpacePage } from './SpacePage';
import { SpaceTasksPage } from './SpacePage/subpages/SpaceTasksPage/SpaceTasksPage';
import { SpaceUsersPage } from './SpacePage/subpages/SpaceUsersPage/SpaceUsersPage';
import { SpacesPage } from './SpacesPage';

export const SpaceRouter = {
    Main: '/spaces',
    Space: (spaceId: number | string) => `/spaces/${spaceId}`,
    Tasks: (spaceId: number | string) => `/spaces/${spaceId}/tasks`,
    Task: (spaceId: number | string, issueId: number | string) => `/spaces/${spaceId}/tasks/${issueId}`,
    EditTask: (spaceId: number | string, issueId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/edit`,
    TaskWork: (spaceId: number | string, issueId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/works/${workId}`,
    EstimateTaskWork: (spaceId: number | string, issueId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/works/${workId}/estimate`,
    Works: (spaceId: number | string) => `/spaces/${spaceId}/works`,
    Users: (spaceId: number | string) => `/spaces/${spaceId}/users`,
    Team: (spaceId: number | string) => `/spaces/${spaceId}/team`,
    User: (spaceId: number | string, userId: number | string) => `/spaces/${spaceId}/users/${userId}`,
};

export const spacesRouteConfig: ConfigRouteProps[] = [
    {
        path: SpaceRouter.Space(':spaceId'),
        withAuthGuard: true,
        element: <SpacePage />,
        children: [
            {
                path: SpaceRouter.Space(':spaceId'),
                element: <RedirectToTasks />,
            },
            {
                path: SpaceRouter.EditTask(':spaceId', ':issueId'),
                element: null,
            },
            {
                path: SpaceRouter.TaskWork(':spaceId', ':issueId', ':solutionId'),
                element: <SpaceSolutionPage />,
            },
            {
                path: SpaceRouter.EstimateTaskWork(':spaceId', ':issueId', ':solutionId'),
                element: <SpaceCreateReviewPage />, // <SpaceEngineeringWorksPage/>
            },
            {
                path: SpaceRouter.Task(':spaceId', ':issueId'),
                element: <SpaceTaskPage />,
            },
            {
                path: SpaceRouter.Tasks(':spaceId'),
                element: <SpaceTasksPage />,
            },
            {
                path: SpaceRouter.Works(':spaceId'),
                element: <SpaceSolutionsPage />,
            },
            {
                path: SpaceRouter.User(':spaceId', ':userId'),
                element: null,
            },
            {
                path: SpaceRouter.Users(':spaceId'),
                element: <SpaceUsersPage />,
            },
            {
                path: SpaceRouter.Team(':spaceId'),
                element: <SpaceTeamPage />,
            },
        ],
    },
    {
        path: SpaceRouter.Main,
        withAuthGuard: true,
        element: <SpacesPage />,
    },
];
