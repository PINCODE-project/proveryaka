import { render, screen } from '@testing-library/react';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { SpaceCard } from './SpaceCard';

describe('entities/space/SpaceCard', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    test('Компонент отобразился в DOM', () => {
        render(<SpaceCard data-testid="SpaceCard" space={{}} />, { wrapper });

        const component = screen.getByTestId('SpaceCard');
        expect(component).toBeInTheDocument();
    });
});
