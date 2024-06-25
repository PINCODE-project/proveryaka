import { screen, render } from '@testing-library/react';

import {
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import {
    mockI18Next,
    restoreI18NextMock,
} from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { TaskCard } from './TaskCard';

describe('entities/space/TaskCard', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreAxiosMock();
        restoreI18NextMock();
    });

    beforeEach(() => {
        mockAxios();
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<TaskCard />, { wrapper });

        const component = await screen.findByTestId('TaskCard');
        expect(component).toBeInTheDocument();
    });
});
