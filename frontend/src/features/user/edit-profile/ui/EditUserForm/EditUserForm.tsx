import { Button, Col, Flex, Form, Input, message, notification, Row } from 'antd';
import { FC, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { FullUserInfoResponse, useGetCurrentUserInfo } from '@entities/user';
import { getCurrentUserQueryKey } from '@entities/user/lib/getCurrentUserQueryKey';

import { createFile } from '@shared/api/file/createFile';
import { typedMemo, useGetEstimateFile } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput, ImagePreview } from '@shared/ui';
import { FileType } from '@shared/ui/FileInput/FileInput';

import styles from './EditUserForm.module.css';
import { useEditUser } from '../../lib/useEditUser';

export type Props = ClassNameProps & TestProps & Readonly<{
    onSuccess: () => void;
}>;

export const EditUserForm: FC<Props> = typedMemo(function EditUserForm({
    onSuccess,
}) {
    const { data: user } = useGetCurrentUserInfo();
    const { isStudent } = useRolesCheck();

    const [file, setFile] = useState<File | null>(null);
    const { data: oldFile } = useGetEstimateFile(user?.avatar ?? '', { enabled: Boolean(user?.avatar) });

    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    const { mutate: edit } = useEditUser({
        onSuccess: () => {
            api.success({
                message: 'Настройки профиля изменены',
            });
            queryClient.resetQueries(getCurrentUserQueryKey);
            queryClient.resetQueries(getSpaceStudentsQueryKey());
            queryClient.resetQueries(getSpaceOrganizerQueryKey());
            onSuccess();
        },
    });

    useEffect(() => {
        if (oldFile) {
            setFile(oldFile);
        }
    }, [oldFile]);

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
        let avatar = user?.avatar;

        if (file !== oldFile) {
            avatar = file
                ? await createFile(file).then(({ id }) => id)
                : undefined;
        }

        edit({ ...user, ...data, avatar });
    }, [edit, user, file, oldFile]);

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
                            filledComponent={<ImagePreview file={file} type="circle" />}
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
                            {isStudent
                                ? <Form.Item<FullUserInfoResponse>
                                    className={getModuleClasses(styles, 'formItem')}
                                    label="Группа"
                                    name="academicGroup"
                                >
                                    <Input placeholder="РИ-100000" />
                                </Form.Item>
                                : <Form.Item<FullUserInfoResponse>
                                    className={getModuleClasses(styles, 'formItem')}
                                    label="Должность"
                                    name="position"
                                >
                                    <Input placeholder="Преподаватель" />
                                </Form.Item>}
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
