import { Outlet } from 'react-router-dom';

import { ConfigRouteProps } from '@shared/types';

import { SpaceTeamsPage } from './SpacePage/subpages/SpaceTeamsPage';

export const SpaceRouter = {
    Spaces: '/spaces',
    Space: (id: string) => `/spaces/${id}`,
    SpaceTasks: (id: string) => `/spaces/${id}/tasks`,
    SpaceSolutions: (id: string) => `/spaces/${id}/solutions`,
    SpaceUsers: (id: string) => `/spaces/${id}/users`,
    SpaceTeams: (id: string) => `/spaces/${id}/teams`,
};

export const spaceRouteConfig: ConfigRouteProps[] = [
    {
        path: SpaceRouter.Spaces,
        withAuthGuard: true,
        element: null,
    },
    {
        path: SpaceRouter.Space(':spaceId'),
        withAuthGuard: true,
        element: <Outlet />,
        children: [
            {
                path: SpaceRouter.SpaceTasks(':spaceId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceSolutions(':spaceId'),
                element: null,
                withAuthGuard: true,
            },
            {
                path: SpaceRouter.SpaceUsers(':spaceId'),
                element: null,
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
