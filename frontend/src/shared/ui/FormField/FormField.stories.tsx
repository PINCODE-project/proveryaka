import { Meta, StoryObj } from '@storybook/react';
import * as Yup from 'yup';

import { createDecorators, FormikDecorator } from '@shared/mock/storybook';
import { Input } from '@shared/ui';

import { FormField, Props } from './FormField';

const validationSchema = Yup.object({
    name: Yup.string().required('Enter name'),
    items: Yup.array().min(1, 'Select items'),
    date: Yup.date().nullable().required('Select date'),
});

const meta: Meta<Props<string>> = {
    title: 'shared/FormField',
    component: FormField,
    decorators: createDecorators({
        additionalDecorators: [
            FormikDecorator({
                initialValues: {
                    name: 'Name',
                    items: [],
                    date: null,
                },
                validationSchema,
                onSubmit: () => {
                },
            }),
        ],
    }),
};

export default meta;
type Story = StoryObj<Props<string>>;

export const InputField: Story = {
    args: {
        name: 'name',
        label: 'Name',
        content: ({ onChange, value }) => (
            <Input
                value={value}
                onChange={event => onChange(event.target.value)}
            />
        ),
    },
};
