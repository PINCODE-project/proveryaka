import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

import { CriteriaContent } from '@features/issue/create-issue/ui/CreateIssueFullForm/CriteriaContent';
import { ExampleContent } from '@features/issue/create-issue/ui/CreateIssueFullForm/ExampleContent';

import { validationSchema as validationSchemaCriteria } from '@entities/criteria';
import { ExampleForm, ExampleType, validationSchema as validationSchemaExample } from '@entities/example/common';
import { validationSchema as validationSchemaIssue } from '@entities/issue';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './CreateIssueFullForm.module.css';
import { useCreateIssueFull } from '../../lib/useCreateIssueFull';
import { CreateInfoWithFullInfo } from '../../model/CreateInfoWithFullInfo';

enum IssueStep {
    Common,
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
};

const validationSchema = validationSchemaIssue.shape({
    issueExampleList: Yup.array().of(validationSchemaExample),
    criteriaList: Yup.array().min(1, 'Добавьте критерий').of(
        validationSchemaCriteria.shape({
            criteriaExampleList: Yup.array().of(validationSchemaExample),
        }),
    ),
});
export const CreateIssueFullForm: FC<Props> = typedMemo(function CreateIssueFullForm({
    triggerElement,
    spaceId,
    className,
    'data-testid': dataTestId = 'CreateIssueFullForm',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate: create } = useCreateIssueFull({});
    const [step, setStep] = useState(IssueStep.Common);

    const getContent = useCallback((handleSubmit: () => void) => {
        switch (step) {
            case IssueStep.Common:
                return <ExampleForm />;
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
            {triggerElement(() => setIsOpen(false))}
            <Modal
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
                    <button onClick={() => setStep(IssueStep.Criteria)}>
                        <Text>2</Text>
                        <Text>Критерии</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.ExampleStandard)}>
                        <Text>3</Text>
                        <Text>Эталоны</Text>
                    </button>
                    <button onClick={() => setStep(IssueStep.ExampleAnti)}>
                        <Text>4</Text>
                        <Text>Антипримеры</Text>
                    </button>
                </FlexContainer>

                <Formik
                    initialValues={initialValue}
                    onSubmit={data => create({ data, spaceId })}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit }) => (
                        <Form>
                            {getContent(handleSubmit)}
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
