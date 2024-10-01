import { ConfigRouteProps } from '@shared/types';

import { SpacePage } from './SpacePage';
import { SpaceDescription } from './SpacePage/subpages/SpaceDescription';
import { SpaceSolutionsPage } from './SpacePage/subpages/SpaceSolutionsPage';
import { SpaceTeamsPage } from './SpacePage/subpages/SpaceTeamsPage';
import { SpaceUsersPage } from './SpacePage/subpages/SpaceUsersPage';
import { SpacesPage } from './SpacesPage';

export const SpaceRouter = {
    Spaces: '/spaces',
    Space: (id: string) => `/spaces/${id}`,
    SpaceTasks: (id: string) => `/spaces/${id}/tasks`,
    SpaceDescription: (id: string) => `/spaces/${id}/description`,
    SpaceSolutions: (id: string) => `/spaces/${id}/solutions`,
    SpaceUsers: (id: string) => `/spaces/${id}/users`,
    SpaceTeams: (id: string) => `/spaces/${id}/teams`,
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
];
