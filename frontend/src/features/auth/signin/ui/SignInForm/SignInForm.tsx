import { Input } from 'antd';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Link, Text } from '@shared/ui';

import styles from './SignInForm.module.css';
import { useSignIn } from '../../lib/useSignIn';
import { SignIn } from '../../model/SignIn';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

const initialValue: SignIn = {
    username: '',
    password: '',
};

const validationSchema = Yup.object({
    username: Yup.string().email('Введите почту').required('Введите почту'),
    password: Yup.string().required('Введите пароль'),
});

export const SignInForm: FC<Props> = typedMemo(function SignInForm({
    className,
    'data-testid': dataTestId = 'SignInForm',
}) {
    const { login } = useAuthContext();
    const { mutate: signIn } = useSignIn({
        onSuccess: token => {
            login(token);
        },
    });

    return (
        <Formik initialValues={initialValue} onSubmit={signIn} validationSchema={validationSchema}>
            {() => (
                <Form
                    className={getBemClasses(styles, null, null, className)}
                    data-testid={dataTestId}
                >
                    <FlexContainer direction="column" gap="m" alignItems="center">
                        <Text className={getBemClasses(styles, 'title')}>
                            С возвращением 👋
                        </Text>
                        <Text className={getBemClasses(styles, 'subtitle')}>
                            Войти в систему для оценки
                        </Text>
                    </FlexContainer>

                    <FlexContainer direction="column" gap="xs">
                        <FormField<string>
                            name="username"
                            label="Почта"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                        onBlur={event => onChange(event.target.value.trim())}
                                    />
                                )
                            }
                        />
                        <FormField<string>
                            name="password"
                            label="Пароль"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        type="password"
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                    </FlexContainer>

                    <Button type="submit">
                        Войти
                    </Button>

                    <FlexContainer direction="row" gap="xxs" className={getBemClasses(styles, 'signin')}
                        justifyContent="center"
                    >
                        <Text className={getBemClasses(styles, 'signin_text')}>Нет аккаунта?</Text>
                        <Link to={AuthRouter.SignUp} className={getBemClasses(styles, 'signin_link')}>Создать аккаунт</Link>
                    </FlexContainer>
                </Form>
            )}
        </Formik>
    );
});
