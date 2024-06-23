import { screen, render } from '@testing-library/react';

import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { Separator } from './Separator';

describe('shared/Separator', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });
    it('Компонент появился в DOM дереве', async () => {
        render(<Separator />, { wrapper });

        const component = await screen.findByTestId('Separator');
        expect(component).toBeInTheDocument();
    });
});
