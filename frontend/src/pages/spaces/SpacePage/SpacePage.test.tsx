import { render, screen } from '@testing-library/react';

import { mockAxios, resetAxiosMock } from '@shared/mock/axios';
import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { SpacePage } from './SpacePage';

describe('pages/space/SpacePage', () => {
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
        render(<SpacePage data-testid="SpacePage" />, { wrapper });

        const component = screen.getByTestId('SpacePage');
        expect(component).toBeInTheDocument();
    });
});
