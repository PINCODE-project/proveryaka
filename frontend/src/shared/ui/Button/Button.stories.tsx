import { Meta, StoryObj } from '@storybook/react';

import { Button, Props } from './Button';

const meta: Meta<typeof Button> = {
    title: 'shared/Button',
    component: Button,
};

export default meta;
type Story = StoryObj<Props>;

export const Accent: Story = {
    args: {
        children: 'Click',
    },
};

export const Neutral: Story = {
    args: {
        children: 'Click',
        variant: 'neutral',
    },
};

export const Outline: Story = {
    args: {
        children: 'Click',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Click',
        variant: 'ghost',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Click',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        children: 'Click',
    },
};

export const IsLoading: Story = {
    args: {
        isLoading: true,
        children: 'Click',
    },
};
