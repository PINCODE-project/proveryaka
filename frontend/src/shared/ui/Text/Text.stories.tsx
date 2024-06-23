import { Meta, StoryObj } from '@storybook/react';

import { Props, Text } from './Text';

const meta: Meta<Props> = {
    title: 'shared/Text',
    component: Text,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        children: 'Some text',
    },
};
