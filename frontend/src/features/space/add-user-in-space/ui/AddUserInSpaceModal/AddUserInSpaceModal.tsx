import { Modal, Select } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { useAddUserInSpace } from '@features/space/add-user-in-space/lib/useAddUserInSpace';
import { AddUserToSpaceRequest } from '@features/space/add-user-in-space/model/AddUserToSpaceRequest';

import { getSpaceExpertsQueryKey, getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';

import { roles } from '@shared/consts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, getFlexContainerStyleClasses, SelectItem } from '@shared/ui';

import styles from './AddUserInSpaceModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
    spaceId: string;
}>;

const initialValue: Omit<AddUserToSpaceRequest, 'spaceId'> = {
    userProfileIdList: [],
    role: null,
};

const validationSchema = Yup.object({
    userProfileIdList: Yup.array().min(1, 'Выберите пользователей'),
    role: Yup.number().nullable().required('Выберите роль'),
});

export const AddUserInSpaceModal: FC<Props> = typedMemo(function AddUserInSpaceModal({
    triggerElement,
    spaceId,
    className,
    'data-testid': dataTestId = 'AddUserInSpaceModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const users: SelectItem<number>[] = [];
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number | null>(null);

    const { mutate: addUsers } = useAddUserInSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            queryClient.resetQueries(getSpaceExpertsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
        },
    });

    useEffect(() => {
        if (!isOpen) {
            setSelectedUsers([]);
            setSelectedRoles(null);
        }
    }, [isOpen]);

    const onSubmit = useCallback((form: Omit<AddUserToSpaceRequest, 'spaceId'>) => {
        addUsers({
            ...form,
            spaceId,
        });
    }, [addUsers, spaceId]);

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                title="Добавление пользователей"
                footer={false}
                open={isOpen}
                destroyOnClose
                onCancel={() => setIsOpen(false)}
                className={getBemClasses(styles)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit }) => (
                        <Form
                            className={getFlexContainerStyleClasses({ direction: 'column', gap: 'm', alignItems: 'stretch' })}
                        >
                            <FormField
                                name="userProfileIdList"
                                label="Пользователи"
                                content={
                                    ({ onChange, isInvalid }) => (
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            value={selectedUsers}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={userIds => {
                                                setSelectedUsers(userIds);
                                                onChange(userIds);
                                            }}
                                            className={getBemClasses(styles, 'select')}
                                        >
                                            {users.map(user => (
                                                <Select.Option value={user.value}>{user.label}</Select.Option>
                                            ))}
                                        </Select>
                                    )
                                }
                            />
                            <FormField
                                name="role"
                                label="Роль"
                                content={
                                    ({ onChange, isInvalid }) => (
                                        <Select
                                            showSearch
                                            value={selectedRoles}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={role => {
                                                setSelectedRoles(role);
                                                onChange(role);
                                            }}
                                            className={getBemClasses(styles, 'select')}
                                        >
                                            {roles.map(role => (
                                                <Select.Option value={role.value}>{role.label}</Select.Option>
                                            ))}
                                        </Select>
                                    )
                                }
                            />
                            <Button onClick={() => handleSubmit()}>
                                Добавить
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
