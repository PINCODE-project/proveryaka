import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { useCreateTeam } from '@features/team/create-team/lib/useCreateTeam';
import { useEditTeam } from '@features/team/edit-team/lib/useEditTeam';

import { getSpaceTeamsQueryKey } from '@entities/team/lib/getSpaceTeamsQueryKey';
import { GetTeam } from '@entities/team/model/GetTeam';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FormField, Input } from '@shared/ui';

export type Props = ClassNameProps & TestProps & Readonly<{
    team: GetTeam;
    triggerElement: (open: () => void) => ReactNode;
    spaceId: string;
}>;

const validationSchema = Yup.object({
    name: Yup.string().required('Введите название'),
});

export const EditTeamModal: FC<Props> = typedMemo(function EditTeamModal({
    className,
    spaceId,
    triggerElement,
    team,
    'data-testid': dataTestId = 'EditTeamModal',
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const initialValue = useMemo(() => ({
        name: team.name,
        id: team.id,
    }), [team]);
    const { mutate: edit } = useEditTeam({
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
                title="Изменение команды"
                open={isOpen}
                onCancel={() => setIsOpen(false)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={edit}
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
                                Изменить
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
