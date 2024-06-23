import { screen, render } from '@testing-library/react';

import {
    createWrapper,
} from '@shared/mock/jest';

import { RadioButton } from './RadioButton';

describe('shared/RadioButton', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(<RadioButton label="" name="name" />, { wrapper });

        const component = await screen.findByTestId('RadioButton');
        expect(component).toBeInTheDocument();
    });
});
