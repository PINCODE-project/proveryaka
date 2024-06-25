import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { NavTab, Props } from './NavTab';

const meta: Meta<Props> = {
    title: '/NavTab',
    component: NavTab,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        to: '',
        name: 'Name',
    },
};
