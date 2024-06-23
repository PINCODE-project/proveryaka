import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { Confirm, Props } from './Confirm';

const meta: Meta<Props> = {
    title: 'shared/Confirm',
    component: Confirm,
    decorators: createDecorators({}),
    args: {
        title: 'Title',
        giveAnswer: console.log,
    },
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {

        text: 'Text',
    },
};

export const ComponentContent: Story = {
    args: {
        contentComponent: giveAnswer => (<span onClick={() => giveAnswer(true)}>
            Content component
        </span>),
    },
};
