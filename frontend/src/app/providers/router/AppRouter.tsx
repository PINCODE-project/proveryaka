import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ConfigRouteProps } from '@shared/types';

import { routeConfig } from './config';
import { ProtectRoute } from './ProtectRoute';

export const AppRouter = () => {
    const renderRoute = useCallback((route: ConfigRouteProps) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <ProtectRoute>
                        {route.element}
                    </ProtectRoute>
                }
            >
                {route.children?.map(renderRoute)}
            </Route>
        );
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routeConfig.map(renderRoute)}
            </Routes>
        </Suspense>
    );
};
