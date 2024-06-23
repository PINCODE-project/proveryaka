import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { ReactNode } from 'react';

/**
 * Тестовая оболочка для работы Formik
 * @param config
 */
export const FormikWrapper = <T extends FormikValues, >(config: FormikConfig<T>) => {
    return function FormikWrapper(component: ReactNode) {
        return (
            <Formik<T> {...config}>
                <Form>
                    {component}
                </Form>
            </Formik>
        );
    };
};
