import { screen, render } from '@testing-library/react';

import { createWrapper } from '@shared/mock/jest';

import { NavTab } from './NavTab';

describe('/NavTab', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(<NavTab to="" name="Name" />, { wrapper });

        const component = await screen.findByTestId('NavTab');
        expect(component).toBeInTheDocument();
    });
});
