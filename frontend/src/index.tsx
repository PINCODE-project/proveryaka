import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthContextProvider, AuthProvider } from '@app/providers/AuthProvider';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';

import { getQueryClient } from '@shared/config/query';

import App from './app/App';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <AuthContextProvider>
                <AuthProvider.Consumer>
                    {state => (
                        <QueryClientProvider client={getQueryClient(state!.logout)}>
                            <App />
                            <ToastContainer />
                        </QueryClientProvider>
                    )}
                </AuthProvider.Consumer>
            </AuthContextProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
