import { Form, Input } from 'antd';
import { ReactNode } from 'react';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './TeamForm.module.css';
import { TeamEditor } from '../../model/TeamEditor';

export type Props<TTeam extends TeamEditor> = ClassNameProps & TestProps & Readonly<{
    submit: (data: TTeam) => void;
    submitButton: ReactNode;
    initialValues?: Partial<TTeam>;
    additionalFormItems?: ReactNode;
}>;

export const TeamForm = typedMemo(function TeamForm<TTeam extends TeamEditor>({
    submit,
    submitButton,
    initialValues,
    className,
    additionalFormItems,
}: Props<TTeam>) {
    return (
        <Form
            className={getModuleClasses(styles, 'root', null, className)}
            name="TeamForm"
            layout="vertical"
            onFinish={submit}
            requiredMark={false}
            initialValues={initialValues}
        >
            <Form.Item<TeamEditor>
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введите название' }]}
            >
                <Input placeholder="Введите название..." />
            </Form.Item>

            {additionalFormItems}
            {submitButton}
        </Form>
    );
});
