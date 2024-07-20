import React from 'react';
import { QueryClientProvider } from 'react-query';

import { getQueryClient } from '@shared/config/query';

/**
 * Тестовая оболочка для работы React Query
 * @param component
 */
export const QueryWrapper = (component: React.JSX.Element) => {
    return (
        <QueryClientProvider client={getQueryClient(() => {}, () => {})}>
            {component}
        </QueryClientProvider>
    );
};
