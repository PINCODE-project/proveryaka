import { render, screen } from '@testing-library/react';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { RedirectToTasks } from './RedirectToTasks';

describe('pages/spaces/RedirectToTasks', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    test('Компонент отобразился в DOM', () => {
        render(<RedirectToTasks data-testid="RedirectToTasks" />, { wrapper });

        const component = screen.getByTestId('RedirectToTasks');
        expect(component).toBeInTheDocument();
    });
});
