import { type Decorator } from '@storybook/react';
import * as H from 'history';
import React from 'react';

import { RouterWrapper } from '@shared/mock/jest/RouterWrapper';

/**
 * Storybook-декоратор для работы React-Router
 * @param routePath
 * @param initialEntries
 */
export const RouterDecorator: (routePath: string, initialEntries?: H.LocationDescriptor[]) => Decorator =
    (routePath, initialEntries) => {
        return function MemoryRouterWrapper(Story) {
            return RouterWrapper(routePath, initialEntries)(<Story />);
        };
    };
