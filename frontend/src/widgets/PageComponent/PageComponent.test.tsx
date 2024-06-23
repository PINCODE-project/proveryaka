import { render, screen } from '@testing-library/react';

import { mockAxios, resetAxiosMock } from '@shared/mock/axios';
import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { PageComponent } from './PageComponent';

describe('widgets/PageComponent', () => {
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
        render(<PageComponent data-testid="PageComponent" />, { wrapper });

        const component = screen.getByTestId('PageComponent');
        expect(component).toBeInTheDocument();
    });
});
