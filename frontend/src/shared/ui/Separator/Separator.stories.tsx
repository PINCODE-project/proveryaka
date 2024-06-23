import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { Separator, Props } from './Separator';

const meta: Meta<Props> = {
    title: 'shared/Separator',
    component: Separator,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};

export const WithChildren: Story = {
    args: {
        children: 'Separator',
    },
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        style: { height: '100px' },
    },
};
