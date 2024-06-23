import { render, screen } from '@testing-library/react';

import { FlexContainer } from './FlexContainer';

describe('FlexContainer', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<FlexContainer direction="row"></FlexContainer>);

        const component = await screen.findByTestId('FlexContainer');
        expect(component).toBeInTheDocument();
    });
});
