import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { AppealCard, Props } from './AppealCard';

const meta: Meta<Props> = {
    title: 'entities/space/AppealCard',
    component: AppealCard,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};
