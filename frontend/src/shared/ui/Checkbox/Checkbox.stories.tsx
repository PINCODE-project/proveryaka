import { Meta, StoryObj } from '@storybook/react';

import { Checkbox, Props } from './Checkbox';

const meta: Meta<Props> = {
    title: 'shared/Checkbox',
    component: Checkbox,
};
export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        onChange: () => {},
        label: 'check me',
    },
};

export const Disabled: Story = {
    args: {
        onChange: () => {},
        label: 'check me',
        disabled: true,
        checked: true,
    },
};
