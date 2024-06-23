import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';
import { FlexContainer } from '@shared/ui';

import { RadioButton, Props } from './RadioButton';

const meta: Meta<Props> = {
    title: 'shared/RadioButton',
    component: RadioButton,
    decorators: createDecorators({}),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        label: 'Label',
        name: 'name',
    },
    render: props => (
        <FlexContainer direction="column" gap="s">
            <RadioButton {...props} />
            <RadioButton {...props} />
        </FlexContainer>
    ),
};

export const Disabled: Story = {
    args: {
        label: 'Label',
        name: 'name',
        disabled: true,
    },
};
