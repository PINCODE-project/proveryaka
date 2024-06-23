import { Meta, StoryObj } from '@storybook/react';

import { DropDown, Props } from './DropDown';

const meta: Meta<Props> = {
    title: 'shared/DropDown',
    component: DropDown,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        renderLabel: () => 'summary',
        children: 'content\ncontent\ncontent\ncontent end',
    },
};
