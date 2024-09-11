import { Button, Flex, Form, Input, Typography } from 'antd';
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
    const { login } = useAuthContext();
    const { mutate: signIn } = useSignIn({
        onSuccess: token => {
            login(token);
        },
        retry: false,
    });

    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="SignInForm"
            layout="vertical"
            onFinish={signIn}
            requiredMark={false}
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

            <Form.Item<SignIn>
                label="Почта"
                name="username"
                rules={[
                    { required: true, message: 'Введите почту' },
                    { type: 'email', message: 'Введите почту' },
                ]}
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
