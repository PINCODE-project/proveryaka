import { render, screen } from '@testing-library/react';

import { TaskStatus } from '@entities/space';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { TaskCard } from './TaskCard';

describe('entities/space/TaskCard', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<TaskCard status={TaskStatus.Overdue} />, { wrapper });

        const component = await screen.findByTestId('TaskCard');
        expect(component).toBeInTheDocument();
    });
});
