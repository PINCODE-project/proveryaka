import { Meta, StoryObj } from '@storybook/react';

import { FlexContainer, Props } from './FlexContainer';

const meta: Meta<Props> = {
    title: 'Shared/FlexContainer',
    component: FlexContainer,
};

export default meta;
type Story = StoryObj<Props>;

const demoChildren = [
    <div style={{ width: '150px', height: '150px', backgroundColor: 'red', fontSize: '32px' }} key={1}>1</div>,
    <div style={{ width: '100px', height: '100px', backgroundColor: 'green', fontSize: '32px' }} key={2}>2</div>,
    <div style={{ backgroundColor: 'blue', fontSize: '32px' }} key={3}>3</div>,
];

export const Default: Story = {
    args: {
        children: demoChildren,
    },
};

export const Row: Story = {
    args: {
        children: demoChildren,
        direction: 'row',
        gap: 's',
    },
};

export const Column: Story = {
    args: {
        children: demoChildren,
        direction: 'column',
        gap: 's',
    },
};
