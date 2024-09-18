import { Button, Col, Flex, Form, Input, notification, Row } from 'antd';
import { FC, useCallback } from 'react';

import { useChangePassword } from '@features/user/change-password/lib/useChangePassword';
import { ChangePassword } from '@features/user/change-password/model/ChangePassword';

import { useGetCurrentUserInfo } from '@entities/user';

import { getBemClasses, typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './ChangePasswordForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    onSuccess: () => void;
}>;

export const ChangePasswordForm: FC<Props> = typedMemo(function ChangePasswordForm({
    className,
    onSuccess,
}) {
    const { data: user } = useGetCurrentUserInfo();

    const [api, contextHolder] = notification.useNotification();
    const { mutate: changePassword } = useChangePassword({
        onSuccess: () => {
            api.success({
                message: 'Настройки профиля изменены',
            });
            onSuccess();
        },
    });

    const onFinish = useCallback((form: ChangePassword) => {
        changePassword({
            email: user?.email ?? '',
            newPassword: form.newPassword,
            oldPassword: form.oldPassword,
        });
    }, [changePassword, user]);

    return (
        <Form
            name="EditUserForm"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className={getBemClasses(styles, null, null, className)}
        >
            {contextHolder}

            <Row gutter={[20, 0]}>
                <Col flex="50%">
                    <Form.Item<ChangePassword>
                        label="Текущий пароль"
                        name="oldPassword"
                        rules={[
                            { required: true, message: 'Введите пароль' },
                        ]}
                    >
                        <Input.Password placeholder="password" />
                    </Form.Item>
                </Col>
                <Col flex="50%" />
            </Row>

            <Row gutter={[20, 0]}>
                <Col flex={1}>
                    <Form.Item<ChangePassword>
                        label="Новый пароль"
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Введите пароль' },
                        ]}
                    >
                        <Input.Password placeholder="password" />
                    </Form.Item>
                </Col>
                <Col flex={1}>
                    <Form.Item
                        name="confirm"
                        label="Повторите пароль"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Введите пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const password = getFieldValue('newPassword');
                                    if ((!value && !password) || password === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Flex justify="end">
                <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                    <Button type="primary" htmlType="submit" block>
                        Изменить пароль
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    );
});
