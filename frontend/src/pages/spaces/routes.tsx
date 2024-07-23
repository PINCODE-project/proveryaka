import { SpaceSolutionPage } from '@pages/spaces/SpacePage/subpages/SpaceSolutionPage';
import { SpaceSolutionsPage } from '@pages/spaces/SpacePage/subpages/SpaceSolutionsPage/SpaceSolutionsPage';
import { SpaceTaskPage } from '@pages/spaces/SpacePage/subpages/SpaceTaskPage';

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
    CreateTask: (spaceId: number | string) => `/spaces/${spaceId}/tasks/create`,
    Task: (spaceId: number | string, issueId: number | string) => `/spaces/${spaceId}/tasks/${issueId}`,
    EditTask: (spaceId: number | string, issueId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/edit`,
    TaskWork: (spaceId: number | string, issueId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/works/${workId}`,
    EstimateTaskWork: (spaceId: number | string, issueId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${issueId}/works/${workId}/estimate`,
    Works: (spaceId: number | string) => `/spaces/${spaceId}/works`,
    Appeal: (spaceId: number | string, appealId: number | string) => `/spaces/${spaceId}/appeals/${appealId}`,
    EstimateAppeal: (spaceId: number | string, appealId: number | string) => `/spaces/${spaceId}/appeals/${appealId}/estimate`,
    Users: (spaceId: number | string) => `/spaces/${spaceId}/users`,
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
                path: SpaceRouter.CreateTask(':spaceId'),
                element: null,
            },
            {
                path: SpaceRouter.EditTask(':spaceId', ':issueId'),
                element: null,
            },
            {
                path: SpaceRouter.TaskWork(':spaceId', ':issueId', ':workId'),
                element: <SpaceSolutionPage />,
            },
            {
                path: SpaceRouter.EstimateTaskWork(':spaceId', ':issueId', ':workId'),
                element: null,
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
                path: SpaceRouter.EstimateAppeal(':spaceId', ':appealId'),
                element: null,
            },
            {
                path: SpaceRouter.Appeal(':spaceId', ':appealId'),
                element: null,
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
        ],
    },
    {
        path: SpaceRouter.Main,
        withAuthGuard: true,
        element: <SpacesPage />,
    },
];
