import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { TaskCard, Props } from './TaskCard';

const meta: Meta<Props> = {
    title: 'entities/space/TaskCard',
    component: TaskCard,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
