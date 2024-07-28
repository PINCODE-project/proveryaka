import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import { FC, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { useCreateTeam } from '@features/team/create-team/lib/useCreateTeam';

import { getSpaceUserTeamsQueryKey } from '@entities/team/lib/getSpaceUserTeamsQueryKey';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, Input } from '@shared/ui';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
}>;

const validationSchema = Yup.object({
    name: Yup.string().required('Введите название'),
});

export const CreateTeamModal: FC<Props> = typedMemo(function CreateTeamModal({
    className,

    spaceId,
    'data-testid': dataTestId = 'CreateTeamModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const initialValue = useMemo(() => ({
        name: '',
        spaceId,
    }), [spaceId]);
    const { mutate: create } = useCreateTeam({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId));
            setIsOpen(false);
        },
    });

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Создать команду
            </Button>
            <Modal
                footer={false}
                title="Создание команды"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={create}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit }) => (
                        <Form>
                            <FormField<string>
                                name="name"
                                label="Название"
                                content={
                                    ({ onChange, value }) => (
                                        <Input
                                            value={value}
                                            onChange={event => onChange(event.target.value)}
                                            onBlur={event => onChange(event.target.value.trim())}
                                        />
                                    )
                                }
                            />

                            <Button onClick={() => handleSubmit()}>
                                Создать
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
