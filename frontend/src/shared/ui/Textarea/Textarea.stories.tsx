import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'shared/Textarea',
    component: Textarea,
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Tall: Story = {
    args: {
        defaultValue: 'Lorem ipsum dolor sit amet,\n' +
            'consectetur adipisicing elit.\n' +
            'Libero rem ut vero. At atque dolor dolorum,\n' +
            'error ipsum minima nemo neque perspiciatis,\n' +
            'qui, quibusdam quis ratione recusandae similique suscipit voluptatem!' +
            '\n' +
            '\n' +
            'Lorem ipsum dolor sit amet,\n' +
            'consectetur adipisicing elit.\n' +
            'Libero rem ut vero. At atque dolor dolorum,\n' +
            'error ipsum minima nemo neque perspiciatis,\n' +
            'qui, quibusdam quis ratione recusandae similique suscipit voluptatem!' +
            '\n' +
            '\n' +
            'Lorem ipsum dolor sit amet,\n' +
            'consectetur adipisicing elit.\n' +
            'Libero rem ut vero. At atque dolor dolorum,\n' +
            'error ipsum minima nemo neque perspiciatis,\n' +
            'qui, quibusdam quis ratione recusandae similique suscipit voluptatem!' +
            '\n' +
            '\n' +
            'Lorem ipsum dolor sit amet,\n' +
            'consectetur adipisicing elit.\n' +
            'Libero rem ut vero. At atque dolor dolorum,\n' +
            'error ipsum minima nemo neque perspiciatis,\n' +
            'qui, quibusdam quis ratione recusandae similique suscipit voluptatem!',
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Введите текст сообщения',
    },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Введите текст сообщения',
        disabled: true,
    },
};

export const WithSymbolsCount: Story = {
    args: {
        placeholder: 'Введите текст сообщения',
        maxLength: 100,
    },
    render: props => {
        const [value, setValue] = useState('');

        return <Textarea {...props} value={value} onChange={event => setValue(event.target.value)} />;
    },
};
