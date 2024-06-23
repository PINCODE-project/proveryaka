import type { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { SpacesPage } from './SpacesPage';

const meta = {
    title: 'pages/spaces/SpacesPage',
    component: SpacesPage,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    decorators: createDecorators({}),
} satisfies Meta<typeof SpacesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
