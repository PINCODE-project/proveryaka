import React from 'react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@shared/config/query';

/**
 * Тестовая оболочка для работы React Query
 * @param component
 */
export const QueryWrapper = (component: React.JSX.Element) => {
    return (
        <QueryClientProvider client={queryClient}>
            {component}
        </QueryClientProvider>
    );
};
