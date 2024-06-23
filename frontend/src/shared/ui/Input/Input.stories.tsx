import { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Введите текст сообщения',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'Name',
    },
};

export const Invalid: Story = {
    args: {
        invalid: true,
    },
};
