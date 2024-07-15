import { Input } from 'antd';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Link, Text } from '@shared/ui';

import styles from './SignUpForm.module.css';
import { useSignUp } from '../../lib/useSignUp';
import { SignUp } from '../../model/SignUp';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

const initialValue: SignUp = {
    email: '',
    password: '',
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
};

const validationSchema = Yup.object({
    email: Yup.string().email('Введите почту').required('Введите почту'),
    password: Yup.string().required('Введите пароль'),
    repeat_password: Yup.string().when('password', ([password], schema) =>
        (password?.length ?? 0) > 0
            ? schema.matches(new RegExp(`^${password}$`), 'Пароли не совпадают')
            : schema,
    ),
    name: Yup.string().required('Введите имя'),
    surname: Yup.string().required('Введите фамилию'),
    patronymic: Yup.string(),
    phone: Yup.string().matches(/7[0-9]{10}/, 'Формат: 79000000000'),
});

export const SignUpForm: FC<Props> = typedMemo(function SignInForm({
    className,
    'data-testid': dataTestId = 'SignUpForm',
}) {
    const { login } = useAuthContext();
    const { mutate: signUp } = useSignUp({
        onSuccess: token => {
            login(token);
        },
    });

    return (
        <Formik initialValues={initialValue} onSubmit={signUp} validationSchema={validationSchema}>
            {() => (
                <Form
                    className={getBemClasses(styles, null, null, className)}
                    data-testid={dataTestId}
                >
                    <FlexContainer direction="column" gap="m" alignItems="center">
                        <Text className={getBemClasses(styles, 'title')}>
                            Регистрация
                        </Text>
                    </FlexContainer>

                    <FlexContainer direction="column" gap="xs">
                        <FormField<string>
                            name="name"
                            label="Имя"
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
                            name="surname"
                            label="Фамилия"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                        <FormField<string>
                            name="patronymic"
                            label="Отчество"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                    </FlexContainer>

                    <FlexContainer direction="column" gap="xs">
                        <FormField<string>
                            name="email"
                            label="Почта"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                        <FormField<string>
                            name="phone"
                            label="Телефон"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                    </FlexContainer>

                    <FlexContainer direction="column" gap="xs">
                        <FormField<string>
                            name="password"
                            label="Пароль"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                        <FormField<string>
                            name="repeat_password"
                            label="Повторите пароль"
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                    />
                                )
                            }
                        />
                    </FlexContainer>

                    <Button type="submit">
                        Зарегистрироваться
                    </Button>

                    <FlexContainer direction="row" gap="xxs" className={getBemClasses(styles, 'signin')}
                        justifyContent="center"
                    >
                        <Text className={getBemClasses(styles, 'signin_text')}>Уже есть аккаунт?</Text>
                        <Link to={AuthRouter.SignIn} className={getBemClasses(styles, 'signin_link')}>Войти</Link>
                    </FlexContainer>
                </Form>
            )}
        </Formik>
    );
});
