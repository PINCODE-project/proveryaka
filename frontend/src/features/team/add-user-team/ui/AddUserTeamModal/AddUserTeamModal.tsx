import { Modal, Select } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { useAddUserTeam } from '@features/team/add-user-team/lib/useAddUserTeam';
import { useCreateTeam } from '@features/team/create-team/lib/useCreateTeam';

import { ExampleType } from '@entities/example/common';
import styles from '@entities/example/common/ui/ExampleForm/ExampleForm.module.css';
import { useGetSpaceStudents } from '@entities/space';
import { getSpaceTeamsQueryKey } from '@entities/team/lib/getSpaceTeamsQueryKey';
import { GetTeam } from '@entities/team/model/GetTeam';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, Input } from '@shared/ui';

export type Props = ClassNameProps & TestProps & Readonly<{
    team: GetTeam;
    spaceId: string;
    triggerElement: (open: () => void) => ReactNode;
}>;

const validationSchema = Yup.object({
    userProfileIdList: Yup.array().min(1, 'Выберите участников'),
});

export const AddUserTeamModal: FC<Props> = typedMemo(function AddUserTeamModal({
    className,
    team,
    triggerElement,
    spaceId,
    'data-testid': dataTestId = 'AddUserTeamModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const initialValue = useMemo(() => ({
        teamId: team.id,
        userProfileIdList: [],
    }), [team]);

    const { data: students } = useGetSpaceStudents(spaceId);
    const userOptions = useMemo(() => {
        const teamIds = team.studentInfoList?.map(({ id }) => id) ?? [];
        return students?.studentInfoList?.filter(student => !teamIds.includes(student.id)) ?? [];
    }, [team, students]);

    const { mutate: addUsers } = useAddUserTeam({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            setIsOpen(false);
        },
    });

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                footer={false}
                title="Добавление участника"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={addUsers}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit }) => (
                        <Form>
                            <FormField<string[]>
                                name={'userProfileIdList'}
                                label="Студенты"
                                content={
                                    ({ onChange, isInvalid, value }) => (
                                        <Select
                                            showSearch
                                            value={value}
                                            status={isInvalid ? 'error' : undefined}
                                            onChange={type => {
                                                onChange(type);
                                            }}
                                            mode="multiple"
                                            allowClear
                                            className={getBemClasses(styles, 'select')}
                                        >
                                            {userOptions.map(user => (
                                                <Select.Option value={user.id}>
                                                    {user.surname} {user.name} {user.patronymic}
                                                </Select.Option>
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
