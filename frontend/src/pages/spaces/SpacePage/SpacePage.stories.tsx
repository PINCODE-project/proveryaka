import type { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { SpacePage } from './SpacePage';

const meta = {
    title: 'pages/space/SpacePage',
    component: SpacePage,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    decorators: createDecorators({}),
} satisfies Meta<typeof SpacePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
