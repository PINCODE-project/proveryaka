import { Modal, Select } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useState } from 'react';
import * as Yup from 'yup';

import { useStartDistribution } from '@features/issue/start-distribution/lib/useStartDistribution';

import { useGetSolutions } from '@entities/solution/lib/useGetSolutions';
import { useGetSpaceExperts, useGetSpaceOrganizers, useGetSpaceStudents } from '@entities/space';
import { useGetUserAll } from '@entities/user';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField } from '@shared/ui';

import styles from './StartDistributionForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
    issueId: string;
    spaceId: string;
}>;

const valSchema = Yup.object({
    expertProfileIdList: Yup.array().min(1, 'Выберите проверяющих'),
});

export const StartDistributionForm: FC<Props> = typedMemo(function StartDistributionForm({
    className,
    triggerElement,
    issueId,
    spaceId,
    'data-testid': dataTestId = 'StartDistributionForm',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: startDistribution } = useStartDistribution({

    });
    const [initialValue] = useState({
        expertProfileIdList: [],
        issueId,
    });
    const { data: students } = useGetSpaceStudents(spaceId);
    const { data: experts } = useGetSpaceExperts(spaceId);
    const { data: organizers } = useGetSpaceOrganizers(spaceId);

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                title="Назначить проверки заданий"
                footer={false}
                open={isOpen}
                className={getBemClasses(styles, null, null, className)}
                onCancel={() => setIsOpen(false)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={startDistribution}
                    validationSchema={valSchema}
                >
                    {({ handleSubmit }) => (
                        <Form>
                            <FormField
                                name="expertProfileIdList"
                                label="Проверяющие"
                                className={getBemClasses(styles, 'field')}
                                content={
                                    ({ onChange, value, isInvalid }) => (
                                        <Select
                                            showSearch
                                            className={getBemClasses(styles, 'select')}
                                            value={value}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={type => {
                                                onChange(type);
                                            }}
                                            mode="multiple"
                                            allowClear
                                        >
                                            {students?.studentInfoList?.map(user => (
                                                <Select.Option value={user.id}>
                                                    {user.surname} {user.name} {user.patronymic}
                                                </Select.Option>
                                            ))}
                                            {experts?.expertsInfoList?.map(user => (
                                                <Select.Option value={user.id}>
                                                    {user.surname} {user.name} {user.patronymic}
                                                </Select.Option>
                                            ))}
                                            {organizers?.organizerInfoList?.map(user => (
                                                <Select.Option value={user.id}>
                                                    {user.surname} {user.name} {user.patronymic}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )
                                }
                            />

                            <Button onClick={() => handleSubmit()}>
                                Назначить
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
