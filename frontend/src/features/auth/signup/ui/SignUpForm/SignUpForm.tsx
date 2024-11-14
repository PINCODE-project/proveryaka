import { Button, Flex, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { trimAllObjectValues } from '@shared/lib/trimAllObjectValues';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SignUpForm.module.css';
import { useSignUp } from '../../lib/useSignUp';
import { SignUp } from '../../model/SignUp';

export type Props = ClassNameProps & TestProps;

export const SignUpForm: FC<Props> = typedMemo(function SignInForm({
    className,
}) {
    const { login } = useAuthContext();
    const { mutate: signUp } = useSignUp({
        onSuccess: token => {
            login(token);
        },
    });

    const handleSignUp = (values: SignUp) => {
        signUp(trimAllObjectValues(values) as SignUp);
    };

    const agreementLink = 'https://storage.yandexcloud.net/proverayka/%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.pdf';

    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="SignUpForm"
            layout="vertical"
            onFinish={handleSignUp}
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
                <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                <Button type="primary" htmlType="submit" block>
                    Зарегистрироваться
                </Button>
            </Form.Item>

            <Typography.Text className={getModuleClasses(styles, 'policyPrivacy')}>
                Нажимая на кнопку регистрации вы соглашаетесь с принятой на сайте{' '}
                <a href={agreementLink} target="_blank" rel="noreferrer">
                    <span className={getModuleClasses(styles, 'policyPrivacyLink')}>
                    политикой обработки персональных данных
                    </span>
                </a>
            </Typography.Text>
        </Form>
    );
});
