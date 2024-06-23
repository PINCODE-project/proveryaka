import type { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { Link } from './Link';

const meta = {
    title: 'shared/Link',
    component: Link,
    parameters: {
        layout: 'centered',
    },
    argTypes: {},
    args: {},
    decorators: createDecorators({}),
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        to: '',
    },
};
