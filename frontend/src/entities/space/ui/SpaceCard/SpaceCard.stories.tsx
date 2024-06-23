import type { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { SpaceCard } from './SpaceCard';

const meta = {
    title: 'entities/space/SpaceCard',
    component: SpaceCard,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    decorators: createDecorators({}),
} satisfies Meta<typeof SpaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        space: {},
    },
};
