import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

import '@shared/config/i18n';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';

import { QueryClientProvider } from 'react-query';

import { getQueryClient } from '@shared/config/query';

import { AuthContextProvider, AuthProvider } from '@app/providers/AuthProvider';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <AuthContextProvider>
                <AuthProvider.Consumer>
                    {state => (
                        <QueryClientProvider client={getQueryClient(state!.logout)}>
                            <App />
                        </QueryClientProvider>
                    )}
                </AuthProvider.Consumer>
            </AuthContextProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
