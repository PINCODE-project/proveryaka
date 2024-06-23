import { render, screen } from '@testing-library/react';

import { mockAxios, resetAxiosMock } from '@shared/mock/axios';
import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { SpacesPage } from './SpacesPage';

describe('pages/spaces/SpacesPage', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    beforeEach(() => {
        // mockAxios();
    });

    afterEach(() => {
        resetAxiosMock();
    });

    test('Компонент отобразился в DOM', () => {
        render(<SpacesPage data-testid="SpacesPage" />, { wrapper });

        const component = screen.getByTestId('SpacesPage');
        expect(component).toBeInTheDocument();
    });
});
