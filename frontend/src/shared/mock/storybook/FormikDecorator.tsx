import { type Decorator } from '@storybook/react';
import { FormikConfig, FormikValues } from 'formik';

import { FormikWrapper } from '@shared/mock/jest/FormikWrapper';

/**
 * Storybook-декоратор для работы Formik
 * @param config
 */
export const FormikDecorator: <T extends FormikValues, >(config: FormikConfig<T>) => Decorator =
    config => {
        return function FormikDecorator(Story) {
            return FormikWrapper(config)(<Story />);
        };
    };
