import { Modal, Select } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { useAddUserInSpace } from '@features/space/add-user-in-space/lib/useAddUserInSpace';
import { AddUserToSpaceRequest } from '@features/space/add-user-in-space/model/AddUserToSpaceRequest';

import { getSpaceExpertsQueryKey, getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';
import { useGetUserAll } from '@entities/user';

import { roles } from '@shared/consts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, getFlexContainerStyleClasses } from '@shared/ui';

import styles from './AddUserInSpaceModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
    spaceId: string;
}>;

const initialValue: Omit<AddUserToSpaceRequest, 'spaceId'> = {
    userProfileIdList: [],
    spaceRoleType: null,
};

const validationSchema = Yup.object({
    userProfileIdList: Yup.array().min(1, 'Выберите пользователей'),
    spaceRoleType: Yup.number().nullable().required('Выберите роль'),
});

export const AddUserInSpaceModal: FC<Props> = typedMemo(function AddUserInSpaceModal({
    triggerElement,
    spaceId,
    className,
    'data-testid': dataTestId = 'AddUserInSpaceModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const { data: users } = useGetUserAll();

    const { mutate: addUsers } = useAddUserInSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            queryClient.resetQueries(getSpaceExpertsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
        },
    });

    const onSubmit = useCallback((form: Omit<AddUserToSpaceRequest, 'spaceId'>) => {
        addUsers({
            ...form,
            spaceId,
        });
    }, [addUsers, spaceId]);

    if (!users) {
        return null;
    }

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
                            className={getFlexContainerStyleClasses({
                                direction: 'column',
                                gap: 'm',
                                alignItems: 'stretch',
                            })}
                        >
                            <FormField
                                name="userProfileIdList"
                                label="Пользователи"
                                content={
                                    ({ onChange, isInvalid, value }) => (
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            value={value}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={userIds => {
                                                onChange(userIds);
                                            }}
                                            filterOption={(input, option) =>
                                                ((option?.label ?? '')).toLowerCase().includes(input.toLowerCase())
                                            }
                                            className={getBemClasses(styles, 'select')}
                                            options={users.userInfoList?.map(user => (
                                                {
                                                    value: user.id,
                                                    label: `${user.surname} ${user.name} ${user.patronymic}`,
                                                }
                                            ))}
                                        />
                                    )
                                }
                            />
                            <FormField
                                name="spaceRoleType"
                                label="Роль"
                                content={
                                    ({ onChange, isInvalid, value }) => (
                                        <Select
                                            showSearch
                                            value={value}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={role => {
                                                onChange(role);
                                            }}
                                            className={getBemClasses(styles, 'select')}
                                            filterOption={(input, option) =>
                                                ((option?.label ?? '')).toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={roles.map(role => (
                                                {
                                                    value: role.value,
                                                    label: `${role.label}`,
                                                }
                                            ))}
                                        />
                                    )
                                }
                            />
                            <Button onClick={() => handleSubmit()}>
                                Добавить
                            </Button >
                        </Form >
                    )}
                </Formik >
            </Modal >
        </>
    );
});
