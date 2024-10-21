import { App, ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthContextProvider } from '@app/providers/AuthProvider';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { QueryProvider } from '@app/providers/QueryProvider';
import { AppRouter } from '@app/providers/router/AppRouter';

import '@shared/styles/index.css';
import '@app/styles/index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <AuthContextProvider>
                <QueryProvider>
                    <ConfigProvider
                        locale={locale}
                        theme={{
                            token: {
                                colorPrimary: '#0D9E47',
                            },
                        }}
                    >
                        <App>
                            <AppRouter />
                            <div id="confirm-portal" />
                        </App>
                    </ConfigProvider>
                </QueryProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </ErrorBoundary>,
);
