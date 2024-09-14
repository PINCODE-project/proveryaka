import { Form, Input, Select } from 'antd';
import { ReactNode } from 'react';

import { useGetSpaceStudents } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './TeamForm.module.css';
import { TeamEditor } from '../../model/TeamEditor';

export type Props<TTeam extends TeamEditor> = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    submit: (data: TTeam) => void;
    submitButton: ReactNode;
    initialValues?: Partial<TTeam>;
}>;

export const TeamForm = typedMemo(function TeamForm<TTeam extends TeamEditor>({
    spaceId,
    submit,
    submitButton,
    initialValues,
    className,
}: Props<TTeam>) {
    const { data: students } = useGetSpaceStudents(spaceId);

    if (!students) {
        return;
    }
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

            <Form.Item<TeamEditor>
                label="Участники"
                // name="users"
                rules={[{ required: true, message: 'Выберите участников' }]}
            >
                <Select mode="multiple" placeholder="Не выбрано">
                    {students.studentInfoList?.map(student => (
                        <Select.Option value={student.id} key={student.id}>
                            {student.surname} {student.name} {student.patronymic}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {submitButton}
        </Form>
    );
});
