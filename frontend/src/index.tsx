import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthContextProvider } from '@app/providers/AuthProvider';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { QueryProvider } from '@app/providers/QueryProvider';

import App from './app/App';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <AuthContextProvider>
                <QueryProvider>
                    <App />
                    <ToastContainer />
                </QueryProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
