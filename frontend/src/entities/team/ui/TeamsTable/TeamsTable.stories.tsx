import { Meta, StoryObj } from '@storybook/react';

import { createDecorators } from '@shared/mock/storybook';

import { TeamsTable, Props } from './TeamsTable';
import { getTeamsAxiosMock } from '../../mock/getTeamsAxiosMock';

const meta: Meta<Props> = {
    title: 'entities/team/TeamsTable',
    component: TeamsTable,
    decorators: createDecorators({
        axiosMocks: getTeamsAxiosMock(),
    }),
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {
        spaceId: '0',
    },
};
