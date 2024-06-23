import './styles/index.css';
import { useTranslation } from 'react-i18next';

import { AppRouter } from './providers/router/AppRouter';
import '@shared/styles/index.css';

const App = () => {
    const { t } = useTranslation();
    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
