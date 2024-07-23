import {Modal} from 'antd';
import {FC, ReactNode, useState} from 'react';

import {getBemClasses, typedMemo} from '@shared/lib';
import {ClassNameProps} from '@shared/types';

import styles from './EditIssueForm.module.css';
import {getIssueQueryKey, GetIssueResponse, getSpaceIssueQueryKey, IssueForm, validationSchema} from "@entities/issue";
import {Form, Formik} from "formik";
import {Button} from "@shared/ui";
import {useEditIssue} from "@features/issue/edit-issue/lib/useEditIssue";
import {useQueryClient} from "react-query";

export type Props = ClassNameProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
    issue: GetIssueResponse;
    spaceId: string;
}>;

export const EditIssueForm: FC<Props> = typedMemo(function EditIssueForm({
                                                                             className,
                                                                             issue,
                                                                             spaceId,
                                                                             triggerElement,
                                                                         }) {
    const queryClient = useQueryClient()
    const {mutate: edit} = useEditIssue({
        onSuccess:() => {
            setIsOpen(false)
            queryClient.resetQueries(getSpaceIssueQueryKey(spaceId))
            queryClient.resetQueries(getIssueQueryKey(issue.id))
        }
    })
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                title="Изменить задание"
                footer={false}
                open={isOpen}
                className={getBemClasses(styles, null, null, className)}
                onCancel={() => setIsOpen(false)}
            >
                <Formik
                    initialValues={issue}
                    onSubmit={edit}
                    validationSchema={validationSchema}
                    >
                    {({handleSubmit}) => (
                        <Form>
                            <IssueForm/>
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
