import { Meta, StoryObj } from '@storybook/react';

import { ExpandIcon, Props } from './ExpandIcon';

const meta: Meta<Props> = {
    title: 'shared/ExpandIcon',
    component: ExpandIcon,
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        isExpanded: false,
    },
};
