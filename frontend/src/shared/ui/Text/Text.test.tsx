import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('shared/Text', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<Text />);

        const component = await screen.findByTestId('Text');
        expect(component).toBeInTheDocument();
    });
});
