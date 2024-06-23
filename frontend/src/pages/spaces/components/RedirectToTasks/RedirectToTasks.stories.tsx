import type { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { RedirectToTasks } from './RedirectToTasks';

const meta = {
    title: 'pages/spaces/RedirectToTasks',
    component: RedirectToTasks,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    decorators: createDecorators({}),
} satisfies Meta<typeof RedirectToTasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
