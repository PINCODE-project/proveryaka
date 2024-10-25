import { Button, Flex, Form, FormInstance, Steps, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { UserPanel } from '@widgets/UserPanel';

import { useCreateIssueCriteriaDraft } from '@features/issue/create-issue/lib/useCreateIssueCriteriaDraft';
import { useCreateIssueDraft } from '@features/issue/create-issue/lib/useCreateIssueDraft';
import { useCreateIssueFormDraft } from '@features/issue/create-issue/lib/useCreateIssueFormDraft';
import { useCreateIssueMaterialDraft } from '@features/issue/create-issue/lib/useCreateIssueMaterialDraft';
import { useDeleteMyDraft } from '@features/issue/create-issue/lib/useDeleteMyDraft';
import { useSaveMyDraft } from '@features/issue/create-issue/lib/useSaveMyDraft';
import { useUpdateMyDraft } from '@features/issue/create-issue/lib/useUpdateMyDraft';
import { CreateIssueCriteriaDraftRequest } from '@features/issue/create-issue/model/CreateIssueCriteriaDraftRequest';
import {
    CreateIssueCriteriaExampleDraftRequest,
} from '@features/issue/create-issue/model/CreateIssueCriteriaExampleDraftRequest';
import { CreateIssueFormRequest } from '@features/issue/create-issue/model/CreateIssueFormRequest';
import { CreateIssueMaterialDraftRequest } from '@features/issue/create-issue/model/CreateIssueMaterialDraftRequest';
import { CreateIssueCriteriaForm } from '@features/issue/create-issue/ui/CreateIssueCriteriaForm';
import { CreateIssueFormForm } from '@features/issue/create-issue/ui/CreateIssueFormForm';
import { CreateIssueGeneralForm } from '@features/issue/create-issue/ui/CreateIssueGeneralForm';
import { CreateIssueMaterialsForm } from '@features/issue/create-issue/ui/CreateIssueMaterialsForm';
import { RestoreDraftModal } from '@features/issue/create-issue/ui/RestoreDraftModal';

import { getMyIssueDraftQueryKey, useGetMyIssueDraft } from '@entities/issue-draft';
import { useGetSpaceSettings } from '@entities/space';

import { createFile } from '@shared/api/file/createFile';
import Logo from '@shared/assets/images/logo.svg';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceCreateIssuePage.module.css';
import { SpaceRouter } from '../routes';

export type Props = ClassNameProps & TestProps;

dayjs.extend(utc);

export const SpaceCreateIssuePage: FC<Props> = typedMemo(function SpacesPage({
    className,
}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const spaceId = useSpaceId();

    const [currentStep, setCurrentStep] = useState(0);
    const [isOpenRestoreModal, setIsOpenRestoreModal] = useState(false);
    const [isBlockForm, setIsBlockForm] = useState(true);
    const [isNewDraft, setIsNewDraft] = useState(true);

    const { data: spaceSettings } = useGetSpaceSettings(spaceId ?? '');
    const { mutate: updateMyDraft } = useUpdateMyDraft({
        retry: false,
        onSuccess: () => queryClient.invalidateQueries(getMyIssueDraftQueryKey(spaceId!)),
    });
    const { mutate: createIssueDraft } = useCreateIssueDraft({
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries(getMyIssueDraftQueryKey(spaceId!));
            setIsNewDraft(false);
        },
    });
    const { mutate: createIssueMaterialDraft } = useCreateIssueMaterialDraft({ retry: false });
    const { mutate: createIssueCriteriaDraft } = useCreateIssueCriteriaDraft({ retry: false });
    const { mutate: createIssueFormDraft } = useCreateIssueFormDraft({ retry: false });
    const { mutate: saveMyDraft } = useSaveMyDraft({
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries(getMyIssueDraftQueryKey(spaceId!));
            navigate(SpaceRouter.Space(spaceId!));
        },
    });

    const [generalForm] = Form.useForm();
    const [materialsForm] = Form.useForm();
    const [criteriaForm] = Form.useForm();
    const [formsForm] = Form.useForm();
    const [materials, setMaterials] = useState<CreateIssueMaterialDraftRequest[]>([]);
    const [criteria, setCriteria] = useState<CreateIssueCriteriaDraftRequest[]>([]);
    const [forms, setForms] = useState<CreateIssueFormRequest[]>([]);

    const { data: myIssueDraft } = useGetMyIssueDraft(spaceId!, {
        onSuccess: draft => {
            if (isBlockForm) {
                if (draft) {
                    setIsOpenRestoreModal(true);

                    setMaterials(draft.materials!.map(material => ({
                        ...material, id: uuid(), file: null,
                    })) as CreateIssueMaterialDraftRequest[]);

                    setCriteria(draft.criteria!.map(crit => ({
                        ...crit,
                        id: uuid(),
                        examples: crit.examples.map(example => ({
                            ...example,
                            id: uuid(),
                            file: null,
                        })) as CreateIssueCriteriaExampleDraftRequest[],
                    })) as CreateIssueCriteriaDraftRequest[]);
                    setForms(draft.forms!.map(form => ({ ...form, id: uuid() })) as CreateIssueFormRequest[]);
                } else {
                    setIsBlockForm(false);
                    setIsOpenRestoreModal(false);
                    setIsNewDraft(true);
                    setMaterials([]);
                }
            }
        },
        useErrorBoundary: false,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    const { mutate: deleteMyDraft } = useDeleteMyDraft({
        onSuccess: () => {
            queryClient.invalidateQueries(getMyIssueDraftQueryKey(spaceId!));
        },
        retry: false,
    });

    const formIsInvalidate = useCallback(async (index: number, form: FormInstance) => {
        return currentStep === index && !(await form.validateFields().then(() => true).catch(() => false));
    }, [currentStep]);

    const handleChangeStep = useCallback(async (step: number) => {
        if (await formIsInvalidate(0, generalForm)) { return; }
        if (await formIsInvalidate(1, materialsForm)) { return; }
        if (await formIsInvalidate(2, criteriaForm)) { return; }
        if (await formIsInvalidate(3, formsForm)) { return; }

        if (currentStep === 0 && isNewDraft) {
            const generalFormValues = generalForm.getFieldsValue();
            createIssueDraft({
                data: {
                    ...generalFormValues,
                    assessmentDeadlineDateUtc: generalFormValues.assessmentDeadlineDateUtc.utc().format(),
                    submitDeadlineDateUtc: generalFormValues.submitDeadlineDateUtc.utc().format(),
                },
                spaceId: spaceId!,
            });
        }
        if (currentStep === 0 && !isNewDraft) {
            const generalFormValues = generalForm.getFieldsValue();
            updateMyDraft({
                data: {
                    ...generalFormValues,
                    assessmentDeadlineDateUtc: generalFormValues.assessmentDeadlineDateUtc.utc().format(),
                    submitDeadlineDateUtc: generalFormValues.submitDeadlineDateUtc.utc().format(),
                },
                spaceId: spaceId!,
            });
        }
        if (currentStep === 1) {
            const data = await Promise.all(
                materials.map(async material => {
                    let fileId = material.fileId;
                    try {
                        if (material.file) {
                            fileId = (await createFile(material.file)).id;
                        }
                    } catch (error) {
                    }
                    return { ...material, fileId, file: undefined };
                }),
            );

            createIssueMaterialDraft({ spaceId: spaceId!, data });
        }
        if (currentStep === 2) {
            const data = await Promise.all(
                criteria.map(async crit => {
                    const resExamples = await Promise.all(
                        crit.examples.map(async example => {
                            let fileId = example.fileIdValue;
                            try {
                                if (example.file) {
                                    fileId = (await createFile(example.file)).id;
                                }
                            } catch (error) {
                            }
                            return { ...example, fileIdValue: fileId, file: undefined };
                        }),
                    );

                    return { ...crit, examples: resExamples };
                }),
            );

            createIssueCriteriaDraft({ spaceId: spaceId!, data });
        }
        if (currentStep === 3) {
            createIssueFormDraft({ spaceId: spaceId!, data: forms as CreateIssueFormRequest[] });
            if (step === 4) {
                saveMyDraft({ spaceId: spaceId! });
            }
        }

        setCurrentStep(step);
    }, [formIsInvalidate, generalForm, materialsForm, criteriaForm, formsForm, currentStep, isNewDraft,
        createIssueDraft, spaceId, updateMyDraft, materials, createIssueMaterialDraft, criteria,
        createIssueCriteriaDraft, createIssueFormDraft, forms, saveMyDraft]);

    const CreateIssueButtons = useMemo(() => {
        const toIssuesPage = () => navigate(SpaceRouter.SpaceIssues(spaceId || ''));
        const toNextStep = () => {
            handleChangeStep(currentStep + 1);
        };

        return (
            <Flex gap="middle">
                <Button onClick={toIssuesPage}>
                    Выйти
                </Button>
                <Button onClick={toNextStep} type="primary">
                    {currentStep === 3 ? 'Создать' : 'Далее'}
                </Button>
            </Flex>

        );
    }, [currentStep, spaceId, navigate, handleChangeStep]);

    const CreateIssueForm = useMemo(() => {
        if (currentStep === 0) {
            return (
                <CreateIssueGeneralForm
                    disabled={isBlockForm}
                    form={generalForm}
                    isUseTeam={spaceSettings?.isUseTeam || false}
                    initialValue={!isBlockForm && myIssueDraft
                        ? {
                            name: myIssueDraft.name,
                            description: myIssueDraft.description,
                            isUseTeam: myIssueDraft.isUseTeam,
                            checksCountMin: myIssueDraft.checksCountMin,
                            checksCountMax: myIssueDraft.checksCountMax,
                            submitDeadlineDateUtc: myIssueDraft.submitDeadlineDateUtc,
                            assessmentDeadlineDateUtc: myIssueDraft.assessmentDeadlineDateUtc,
                        }
                        : {}}
                />
            );
        }
        if (currentStep === 1) {
            return (
                <CreateIssueMaterialsForm
                    form={materialsForm}
                    materials={materials}
                    setMaterials={setMaterials}
                />
            );
        }

        if (currentStep === 2) {
            return (
                <CreateIssueCriteriaForm
                    form={criteriaForm}
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
            );
        }

        if (currentStep === 3) {
            return (
                <CreateIssueFormForm
                    form={formsForm}
                    forms={forms}
                    setForms={setForms}
                />
            );
        }
    }, [currentStep, isBlockForm, generalForm, spaceSettings?.isUseTeam, myIssueDraft, materialsForm, materials,
        criteriaForm, criteria, formsForm, forms]);

    const handleRestoreDraft = useCallback(() => {
        setIsBlockForm(false);
        setIsOpenRestoreModal(false);
        setIsNewDraft(false);
    }, []);

    const handleDeleteDraft = useCallback(() => {
        deleteMyDraft({ spaceId: spaceId! });
    }, [deleteMyDraft, spaceId]);

    return (
        <>
            <Flex
                vertical
                gap="large"
                className={getModuleClasses(styles, 'root', null, className)}
            >
                <Flex justify="space-between" gap="middle">
                    <Link to={SpaceRouter.Spaces}>
                        <Logo />
                    </Link>
                    <Typography.Text>
                        <UserPanel />
                    </Typography.Text>
                </Flex>

                <Flex justify="space-between" gap="large">
                    <Steps
                        current={currentStep}
                        onChange={handleChangeStep}
                        labelPlacement="vertical"
                        items={[
                            {
                                title: 'Общее',
                            },
                            {
                                title: 'Материалы',
                            },
                            {
                                title: 'Критерии',
                            },
                            {
                                title: 'Форма сдачи',
                            },
                        ]}
                    />
                    {CreateIssueButtons}
                </Flex>

                {CreateIssueForm}
            </Flex>

            <RestoreDraftModal
                isOpen={isOpenRestoreModal}
                onRestoreDraft={handleRestoreDraft}
                onDeleteDraft={handleDeleteDraft}
            />
        </>
    );
});
