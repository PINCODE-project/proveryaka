import { RedirectToTasks } from '@pages/spaces/components/RedirectToTasks';
import { SpacePage } from '@pages/spaces/SpacePage';
import { SpaceTasksPage } from '@pages/spaces/SpacePage/subpages/SpaceTasksPage/SpaceTasksPage';
import { SpacesPage } from '@pages/spaces/SpacesPage';

import { ConfigRouteProps } from '@shared/types';

export const SpaceRouter = {
    Main: '/spaces',
    Space: (spaceId: number | string) => `/spaces/${spaceId}`,
    Tasks: (spaceId: number | string) => `/spaces/${spaceId}/tasks`,
    CreateTask: (spaceId: number | string) => `/spaces/${spaceId}/tasks/create`,
    Task: (spaceId: number | string, taskId: number | string) => `/spaces/${spaceId}/tasks/${taskId}`,
    EditTask: (spaceId: number | string, taskId: number | string) => `/spaces/${spaceId}/tasks/${taskId}/edit`,
    TaskWork: (spaceId: number | string, taskId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${taskId}/works/${workId}`,
    EstimateTaskWork: (spaceId: number | string, taskId: number | string, workId: number | string) => `/spaces/${spaceId}/tasks/${taskId}/works/${workId}/estimate`,
    Appeals: (spaceId: number | string) => `/spaces/${spaceId}/appeals`,
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
                path: SpaceRouter.EditTask(':spaceId', ':taskId'),
                element: null,
            },
            {
                path: SpaceRouter.TaskWork(':spaceId', ':taskId', ':workId'),
                element: null,
            },
            {
                path: SpaceRouter.EstimateTaskWork(':spaceId', ':taskId', ':workId'),
                element: null,
            },
            {
                path: SpaceRouter.Task(':spaceId', ':taskId'),
                element: null,
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
                path: SpaceRouter.Appeals(':spaceId'),
                element: null,
            },
            {
                path: SpaceRouter.User(':spaceId', ':userId'),
                element: null,
            },
            {
                path: SpaceRouter.Users(':spaceId'),
                element: null,
            },
        ],
    },
    {
        path: SpaceRouter.Main,
        withAuthGuard: true,
        element: <SpacesPage />,
    },
];
