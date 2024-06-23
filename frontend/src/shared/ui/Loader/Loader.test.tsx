import { screen, render } from '@testing-library/react';

import { Loader } from './Loader';

describe('shared/Loader', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<Loader data-testid="Loader" />);

        const component = await screen.findByTestId('Loader');
        expect(component).toBeInTheDocument();
    });
});
