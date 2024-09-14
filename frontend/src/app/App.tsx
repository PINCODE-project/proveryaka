import { notification } from 'antd';

import '@shared/styles/index.css';

import './styles/index.css';
import { AppRouter } from './providers/router/AppRouter';

const App = () => {
    const [_, globalContextHolder] = notification.useNotification();

    return (<>
        {globalContextHolder}
        <AppRouter />
    </>);
};

export default App;
