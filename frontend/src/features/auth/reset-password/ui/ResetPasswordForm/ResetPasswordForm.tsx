import { App, Button, Flex, Form, Input, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthRouter } from '@pages/auth';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { trimAllObjectValues } from '@shared/lib/trimAllObjectValues';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './ResetPasswordForm.module.css';
import { useResetPassword } from '../../lib/useResetPassword';
import { ResetPassword } from '../../model/ResetPassword';

export type Props = ClassNameProps & TestProps;

export const ResetPasswordForm: FC<Props> = typedMemo(function SignInForm({
    className,
}) {
    const navigate = useNavigate();
    const { notification } = App.useApp();

    const { mutate: resetPassword } = useResetPassword({
        onSuccess: () => {
            notification.success({
                message: 'Проверьте почту',
                description: 'Ссылка для восстановления пароля направлена на вашу почту',
            });
        },
    });

    const handleResetPassword = (values: ResetPassword) => {
        resetPassword(trimAllObjectValues(values) as ResetPassword);
    };

    const back = useCallback(() => navigate(AuthRouter.SignIn), [navigate]);

    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="ResetPasswordForm"
            layout="vertical"
            onFinish={handleResetPassword}
        >
            <Typography.Text className={getModuleClasses(styles, 'title')}>
                Восстановление пароля
            </Typography.Text>

            <Flex vertical gap="large">
                <Typography.Text>
                    На вашу почту будет выслан новый пароль
                </Typography.Text>
                <Form.Item<ResetPassword>
                    name="email"
                    rules={[
                        { required: true, message: 'Введите почту' },
                        { type: 'email', message: 'Введите почту' },
                    ]}
                >
                    <Input placeholder="ivanivanov@yandex.ru" />
                </Form.Item>
            </Flex>

            <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                <Button type="primary" htmlType="submit" block>
                    Восстановить
                </Button>
            </Form.Item>

            <Button type="default" block onClick={back}>
                Вернуться
            </Button>
        </Form>
    );
});
