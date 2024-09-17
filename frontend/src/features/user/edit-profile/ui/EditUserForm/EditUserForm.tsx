import { Button, Col, Flex, Form, Input, message, notification, Row } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { FullUserInfoResponse, useGetCurrentUserInfo } from '@entities/user';
import { getCurrentUserQueryKey } from '@entities/user/lib/getCurrentUserQueryKey';

import { createFile } from '@shared/api/file/createFile';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput } from '@shared/ui';
import { FileType } from '@shared/ui/FileInput/FileInput';

import styles from './EditUserForm.module.css';
import { useEditUser } from '../../lib/useEditUser';

export type Props = ClassNameProps & TestProps & Readonly<{
    onSuccess: () => void;
}>;

export const EditUserForm: FC<Props> = typedMemo(function EditUserForm({
    onSuccess,
}) {
    const [file, setFile] = useState<File | null>(null);

    const { data: user } = useGetCurrentUserInfo();

    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    const { mutate: edit } = useEditUser({
        onSuccess: () => {
            api.success({
                message: 'Настройки профиля изменены',
            });
            queryClient.resetQueries(getCurrentUserQueryKey);
            onSuccess();
        },
    });

    const beforeUpload = useCallback((file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Можно загружать только JPG/PNG файлы!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Изображение должно быть меньше 0.8Мб');
        }
        return isJpgOrPng && isLt2M;
    }, []);

    const onFinish = useCallback(async (data: FullUserInfoResponse & {password?: string}) => {
        const avatarId = file ? await createFile(file) : undefined;
        edit({ ...user, ...data });
    }, [edit, user, file]);

    return (
        <>
            {contextHolder}
            <Form
                name="EditUserForm"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                initialValues={user}
            >
                <Flex vertical gap={20}>
                    <Flex gap={20}>
                        <FileInput
                            name="avatar"
                            beforeUpload={beforeUpload}
                            listType="picture-circle"
                            showUploadList={false}
                            isEmpty={file === null}
                            accept="image/png, image/jpeg"
                            filledComponent={
                                <img
                                    src={file ? URL.createObjectURL(file) : ''}
                                    alt="avatar"
                                    style={{ width: '100%' }}
                                />
                            }
                            emptyText="Аватар"
                            onChangeFile={setFile}
                        />
                        <Row gutter={[20, 14]} className={getModuleClasses(styles, 'main')}>
                            <Col flex={1}>
                                <Flex vertical gap={20}>
                                    <Form.Item<FullUserInfoResponse>
                                        className={getModuleClasses(styles, 'formItem')}
                                        label="Имя"
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Введите имя' },
                                        ]}
                                    >
                                        <Input placeholder="Иван" />
                                    </Form.Item>
                                    <Form.Item<FullUserInfoResponse>
                                        className={getModuleClasses(styles, 'formItem')}
                                        label="Отчество"
                                        name="patronymic"
                                    >
                                        <Input placeholder="Иванович" />
                                    </Form.Item>
                                </Flex>
                            </Col>
                            <Col flex={1}>
                                <Form.Item<FullUserInfoResponse>
                                    className={getModuleClasses(styles, 'formItem')}
                                    label="Фамилия"
                                    name="surname"
                                    rules={[
                                        { required: true, message: 'Введите фамилию' },
                                    ]}
                                >
                                    <Input placeholder="Иванов" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Flex>

                    <Row gutter={[20, 0]}>
                        <Col flex={1}>
                            <Form.Item<FullUserInfoResponse>
                                className={getModuleClasses(styles, 'formItem')}
                                label="Почта"
                                name="email"
                                rules={[
                                    { required: true, message: 'Введите почту' },
                                    { type: 'email', message: 'Введите почту' },
                                ]}
                            >
                                <Input placeholder="ivanivanov@yandex.ru" />
                            </Form.Item>
                        </Col>
                        <Col flex={1}>
                            <Form.Item<FullUserInfoResponse>
                                className={getModuleClasses(styles, 'formItem')}
                                label="Группа"
                                name="academicGroup"
                            >
                                <Input placeholder="РИ-100000" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item<FullUserInfoResponse>
                        label="Дополнительно"
                        name="status"
                        className={getModuleClasses(styles, 'formItem')}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Фронтенд-разработчик"
                        />
                    </Form.Item>

                    <Flex justify="end">
                        <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                            <Button type="primary" htmlType="submit" block>
                                    Сохранить
                            </Button>
                        </Form.Item>
                    </Flex>
                </Flex>
            </Form>
        </>
    );
});
