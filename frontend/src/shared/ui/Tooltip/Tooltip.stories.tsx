import { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'shared/Tooltip',
    component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        children: <p>Hover</p>,
        content: 'Tooltip',
        id: 'id',
    },
};

export const ContentIsHTML: Story = {
    args: {
        children: <p>Hover</p>,
        render: () => <div><p>This is html</p><br /><p>This is html</p></div>,
        id: 'id',
    },
};
