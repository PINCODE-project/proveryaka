import { screen, render } from '@testing-library/react';

import {
    mockAxios,
    resetAxiosMock,
} from '@shared/mock/axios';
import { createWrapper } from '@shared/mock/jest';

import { TeamsTable } from './TeamsTable';
import { getTeamsAxiosMock } from '../../mock/getTeamsAxiosMock';

describe('entities/team/TeamsTable', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        resetAxiosMock();
    });

    beforeEach(() => {
        mockAxios(getTeamsAxiosMock());
    });

    afterEach(() => {
        resetAxiosMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(<TeamsTable spaceId="0" />, { wrapper });

        const component = await screen.findByTestId('TeamsTable');
        expect(component).toBeInTheDocument();
    });
});
