import { Meta, StoryObj } from '@storybook/react';

import { Props, Spoiler } from './Spoiler';

const meta: Meta<Props> = {
    title: 'shared/Spoiler',
    component: Spoiler,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        renderLabel: () => 'summary',
        children: 'content',
    },
};
