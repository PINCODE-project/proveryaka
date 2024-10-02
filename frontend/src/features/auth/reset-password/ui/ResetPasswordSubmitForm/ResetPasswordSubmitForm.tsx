import { App, Button, Flex, Form, Input, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthRouter } from '@pages/auth';

import { useResetPasswordSubmit } from '@features/auth/reset-password/lib/useResetPasswordSubmit';
import { ResetPasswordSubmit } from '@features/auth/reset-password/model/ResetPasswordSubmit';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { trimAllObjectValues } from '@shared/lib/trimAllObjectValues';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './ResetPasswordSubmitForm.module.css';
import { useResetPassword } from '../../lib/useResetPassword';
import { ResetPassword } from '../../model/ResetPassword';

export type Props = ClassNameProps & TestProps;

export const ResetPasswordSubmitForm: FC<Props> = typedMemo(function ResetPasswordSubmitForm({
    className,
}) {
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const { token, userId } = useParams<{token: string; userId: string}>();

    const { mutate: resetPasswordSubmit } = useResetPasswordSubmit({
        onSuccess: () => {
            notification.success({
                message: 'Пароль изменен',
            });
            navigate(AuthRouter.SignIn);
        },
    });

    const handleResetPassword = (values: ResetPasswordSubmit) => {
        resetPasswordSubmit({
            token: token ?? '',
            body: trimAllObjectValues({ ...values, userId }) as ResetPasswordSubmit,
        });
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
                    Введите новый пароль
                </Typography.Text>
                <Form.Item<ResetPasswordSubmit>
                    name="password"
                    rules={[
                        { required: true, message: 'Введите пароль' },
                        { min: 4, message: 'Минимум 4 символа' },
                    ]}
                >
                    <Input placeholder="password" />
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
