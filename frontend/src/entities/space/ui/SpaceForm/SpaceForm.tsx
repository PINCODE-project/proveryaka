import { PlusOutlined } from '@ant-design/icons';
import { Flex, Form, Input, Upload } from 'antd';
import { ReactNode } from 'react';

import { SignIn } from '@features/auth/signin/model/SignIn';
import { CreateSpaceRequest } from '@features/space/create-space/model/CreateSpaceRequest';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceForm.module.css';
import { SpaceSettings } from '../../model/SpaceSettings';

export type Props<TData extends SpaceSettings> = ClassNameProps & TestProps & Readonly<{
    submit: (data: TData) => void;
    additionalFormItems?: ReactNode;
    submitButton: ReactNode;
    initialValues?: TData;
}>;

export const SpaceForm = typedMemo(function SpaceForm<TData extends SpaceSettings>({
    className,
    submitButton,
    submit,
    initialValues,
    additionalFormItems,
}: Props<TData>) {
    // TODO: жду макет (Алина)
    return (
        <Form
            className={getModuleClasses(styles, 'form', null, className)}
            name="SignInForm"
            layout="vertical"
            onFinish={submit}
            requiredMark={false}
            initialValues={initialValues}
        >
            <Flex>
                <Form.Item<CreateSpaceRequest> valuePropName="fileList" name="icon">
                    <Upload action="/upload.do" listType="picture-card" showUploadList={false}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Иконка</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item<CreateSpaceRequest>
                    label="Название"
                    name="name"
                    rules={[
                        { required: true, message: 'Введите название' },
                    ]}
                >
                    <Input placeholder="Введите название..." />
                </Form.Item>
            </Flex>
            <Form.Item<CreateSpaceRequest>
                label="Описание"
                name="description"
                rules={[
                    { required: true, message: 'Введите описание' },
                ]}
            >
                <Input.TextArea rows={3} placeholder="Введите описание..." />
            </Form.Item>
            {additionalFormItems}
            {submitButton}
        </Form>
    );
});
