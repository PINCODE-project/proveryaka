import { render, screen } from '@testing-library/react';

import { TaskStatus } from '@entities/space';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { AppealCard } from './AppealCard';

describe('entities/space/AppealCard', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<AppealCard status={TaskStatus.Overdue} />, { wrapper });

        const component = await screen.findByTestId('AppealCard');
        expect(component).toBeInTheDocument();
    });
});
