import { Meta, StoryObj } from '@storybook/react';

import { Loader, Props } from './Loader';

const meta: Meta<Props> = {
    title: 'shared/Loader',
    component: Loader,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
