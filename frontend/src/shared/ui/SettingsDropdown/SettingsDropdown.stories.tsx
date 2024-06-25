import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { SettingsDropdown, Props } from './SettingsDropdown';

const meta: Meta<Props> = {
    title: 'shared/SettingsDropdown',
    component: SettingsDropdown,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
