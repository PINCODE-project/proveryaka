import { screen, render } from '@testing-library/react';

import { createWrapper, FormikWrapper } from '@shared/mock/jest';
import { Input } from '@shared/ui';

import { FormField } from './FormField';

describe('shared/FormField', () => {
    const wrapper = createWrapper({
        additionalWrappers: [
            FormikWrapper({
                initialValues: { name: '' },
                onSubmit: () => {},
            }),
        ],
    });

    it('Компонент появился в DOM дереве', async () => {
        render(
            <FormField<string>
                name="name"
                content={context => (
                    <Input
                        onChange={event => context.onChange(event.target.value)}
                        value={context.value}
                    />
                )}
            />,
            { wrapper });

        const component = await screen.findByTestId('FormField');
        expect(component).toBeInTheDocument();
    });
});
