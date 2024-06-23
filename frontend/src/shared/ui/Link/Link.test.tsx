import { render, screen } from '@testing-library/react';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { Link } from './Link';

describe('shared/Link', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    test('Компонент отобразился в DOM', () => {
        render(<Link data-testid="Link" to="" />, { wrapper });

        const component = screen.getByTestId('Link');
        expect(component).toBeInTheDocument();
    });
});
