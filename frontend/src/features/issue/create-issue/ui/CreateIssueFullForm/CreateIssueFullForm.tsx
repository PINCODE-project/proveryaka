import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { CriteriaContent } from '@features/issue/create-issue/ui/CreateIssueFullForm/CriteriaContent';
import { ExampleContent } from '@features/issue/create-issue/ui/CreateIssueFullForm/ExampleContent';
import { IssueFormList } from '@features/issue/create-issue/ui/CreateIssueFullForm/IssueFormList';

import { validationSchema as validationSchemaCriteria } from '@entities/criteria';
import { ExampleForm, ExampleType, validationSchema as validationSchemaExample } from '@entities/example/common';
import { getSpaceIssueQueryKey, IssueForm, validationSchema as validationSchemaIssue } from '@entities/issue';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './CreateIssueFullForm.module.css';
import { useCreateIssueFull } from '../../lib/useCreateIssueFull';
import { CreateInfoWithFullInfo } from '../../model/CreateInfoWithFullInfo';

enum IssueStep {
    Common,
    IssueFormList,
    Criteria,
    ExampleStandard,
    ExampleAnti
}

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerElement: (open: () => void) => ReactNode;
    spaceId: string;
}>;

const initialValue: Omit<CreateInfoWithFullInfo, 'spaceId'> = {
    name: '',
    description: '',
    assessmentDeadlineDateUtc: null,
    submitDeadlineDateUtc: null,
    materialsUrl: '',
    checksCountMin: 0,
    checksCountMax: 0,
    issueExampleList: [],
    criteriaList: [],
    allSolutionCount: 0,
    allTeamCountInSpace: 0,
    issueFormList: [],
    reviewedSolutionCount: 0,
};

const validationSchema = validationSchemaIssue.shape({
    issueExampleList: Yup.array().of(validationSchemaExample),
    criteriaList: Yup.array().min(1, 'Добавьте критерий').of(
        validationSchemaCriteria.shape({
            criteriaExampleList: Yup.array().of(validationSchemaExample),
        }),
    ),
    issueFormList: Yup.array().min(1, 'Добавьте поле для сдачи').of(Yup.object({
        name: Yup.string().required('Введите название поля'),
        description: Yup.string(),
        formSolutionType: Yup.number().min(1, 'Выберите тип поля'),
    })),
});
export const CreateIssueFullForm: FC<Props> = typedMemo(function CreateIssueFullForm({
    triggerElement,
    spaceId,
    className,
    'data-testid': dataTestId = 'CreateIssueFullForm',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: create } = useCreateIssueFull({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceIssueQueryKey(spaceId));
        },
    });
    const [step, setStep] = useState(IssueStep.Common);

    const getContent = useCallback((handleSubmit: () => void) => {
        switch (step) {
            case IssueStep.Common:
                return <IssueForm />;
            case IssueStep.IssueFormList:
                return <IssueFormList />;
            case IssueStep.Criteria:
                return <CriteriaContent />;
            case IssueStep.ExampleStandard:
                return <ExampleContent exampleType={ExampleType.Standard} />;
            case IssueStep.ExampleAnti:
                return (<>
                    <ExampleContent exampleType={ExampleType.AntiExample} />
                    <Button onClick={handleSubmit}>Создать</Button>
                </>);
        }
    }, [step]);

    return (
        <>
            {triggerElement(() => setIsOpen(true))}
            <Modal
                footer={false}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                title="Создание задания"
                className={getBemClasses(styles, null, null, className)}
            >
                <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    gap="s"
                >
                    <button onClick={() => setStep(IssueStep.Common)}>
                        <Text>1</Text>
                        <Text>Общее</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.IssueFormList)}>
                        <Text>2</Text>
                        <Text>Форма сдачи</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.Criteria)}>
                        <Text>3</Text>
                        <Text>Критерии</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.ExampleStandard)}>
                        <Text>4</Text>
                        <Text>Эталоны</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.ExampleAnti)}>
                        <Text>5</Text>
                        <Text>Антипримеры</Text>
                    </button>
                </FlexContainer>

                <Formik
                    initialValues={initialValue}
                    onSubmit={data => create({ data, spaceId })}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, errors }) => {
                        console.log(errors);
                        return (
                            <Form>
                                {getContent(handleSubmit)}
                            </Form>
                        );
                    }}
                </Formik>
            </Modal>
        </>
    );
});
