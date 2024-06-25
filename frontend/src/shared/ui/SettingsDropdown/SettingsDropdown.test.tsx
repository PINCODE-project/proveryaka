import { screen, render } from '@testing-library/react';

import { createWrapper } from '@shared/mock/jest';

import { SettingsDropdown } from './SettingsDropdown';

describe('shared/SettingsDropdown', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(<SettingsDropdown menu={{ items: [] }} />, { wrapper });

        const component = await screen.findByTestId('SettingsDropdown');
        expect(component).toBeInTheDocument();
    });
});
