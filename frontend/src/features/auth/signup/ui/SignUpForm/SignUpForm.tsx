import { Button, Flex, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SignUpForm.module.css';
import { useSignUp } from '../../lib/useSignUp';
import { SignUp } from '../../model/SignUp';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SignUpForm: FC<Props> = typedMemo(function SignInForm({
    className,
}) {
    const { login } = useAuthContext();
    const { mutate: signUp } = useSignUp({
        onSuccess: token => {
            login(token);
        },
    });

    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="SignUpForm"
            layout="vertical"
            onFinish={signUp}
        >
            <Flex
                align="center"
                justify="center"
                gap="middle"
                className={getModuleClasses(styles, 'links')}
            >
                <NavLink
                    className={({ isActive }) => getModuleClasses(styles, 'link', { isActive })}
                    to={AuthRouter.SignUp}
                >
                    Регистрация
                </NavLink>
                <NavLink
                    className={({ isActive }) => getModuleClasses(styles, 'link', { isActive })}
                    to={AuthRouter.SignIn}
                >
                    Вход
                </NavLink>
            </Flex>
            <Form.Item<SignUp>
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Введите имя' }]}
            >
                <Input placeholder="Иван" />
            </Form.Item>

            <Form.Item<SignUp>
                label="Фамилия"
                name="surname"
                rules={[{ required: true, message: 'Введите фамилию' }]}
            >
                <Input placeholder="Иванов" />
            </Form.Item>

            <Form.Item<SignUp>
                label="Отчество"
                name="patronymic"
            >
                <Input placeholder="Иванович" />
            </Form.Item>

            <Form.Item<SignUp>
                label="Почта"
                name="email"
                rules={[
                    { required: true, message: 'Введите почту' },
                    { type: 'email', message: 'Введите почту' },
                ]}
            >
                <Input placeholder="ivanivanov@yandex.ru" />
            </Form.Item>

            <Form.Item<SignUp>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
                <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Повторите пароль"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Введите пароль',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                <Button type="primary" htmlType="submit" block>
                    Зарегистрироваться
                </Button>
            </Form.Item>

            <Typography.Text className={getModuleClasses(styles, 'policyPrivacy')}>
                Нажимая на кнопку регистрации вы соглашаетесь с принятой на сайте
                <span className={getModuleClasses(styles, 'policyPrivacyLink')}> политикой обработки персональных данных</span>
            </Typography.Text>
        </Form>
    );
});
