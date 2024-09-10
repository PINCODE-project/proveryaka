import { Button, Flex, Form, Input, notification, Typography } from 'antd';
import { isAxiosError } from 'axios';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SignInForm.module.css';
import { useSignIn } from '../../lib/useSignIn';
import { SignIn } from '../../model/SignIn';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SignInForm: FC<Props> = typedMemo(function SignInForm({
    className,
}) {
    const [api, contextHolder] = notification.useNotification();

    const { login } = useAuthContext();
    const { mutate: signIn } = useSignIn({
        onSuccess: token => {
            login(token);
        },
        onError: error => {
            if (!isAxiosError(error)) {
                return;
            }
            const data = error.response?.data as { error_description: string } ?? { error_description: '' };
            if (data.error_description === 'invalid_username_or_password') {
                api.error({
                    message: 'Неверные данные',
                    description: 'Проверьте почту и пароль',
                });
            }
        },
    });

    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="SignInForm"
            layout="vertical"
            onFinish={signIn}
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

            {contextHolder}

            <Form.Item<SignIn>
                label="Почта"
                name="username"
                rules={[{ required: true, message: 'Введите почту' }]}
            >
                <Input placeholder="ivanivanov@yandex.ru" />
            </Form.Item>

            <Form.Item<SignIn>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
                <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item>
                <Link to={AuthRouter.RestorePassword}>
                    <Typography.Link color="primary" type="success">
                        Забыли пароль?
                    </Typography.Link>
                </Link>
            </Form.Item>

            <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                <Button type="primary" htmlType="submit" block>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
});
