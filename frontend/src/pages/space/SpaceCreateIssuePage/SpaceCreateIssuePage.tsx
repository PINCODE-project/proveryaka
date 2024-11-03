import { Flex, Form, FormInstance, Steps, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { CreateIssueButtons } from '@pages/space/SpaceCreateIssuePage/CreateIssueButtons';
import { CreateIssueForm } from '@pages/space/SpaceCreateIssuePage/CreateIssueForm';

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
import { RestoreDraftModal } from '@features/issue/create-issue/ui/RestoreDraftModal';

import { getMyIssueDraftQueryKey, useGetMyIssueDraft } from '@entities/issue-draft';
import { useGetSpaceSettings, useRolesCheck } from '@entities/space';

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

    const { isOrganizer } = useRolesCheck();

    useEffect(() => {
        if (!isOrganizer) {
            navigate(SpaceRouter.SpaceIssues(spaceId!));
        }
    }, [isOrganizer, navigate, spaceId]);

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
            navigate(SpaceRouter.SpaceIssues(spaceId!));
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
                        weight: crit.weight * 100,
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

    const validateForms = useCallback(async () => {
        return (
            await formIsInvalidate(0, generalForm) ||
            await formIsInvalidate(1, materialsForm) ||
            await formIsInvalidate(2, criteriaForm) ||
            await formIsInvalidate(3, formsForm)
        );
    }, [formIsInvalidate, generalForm, materialsForm, criteriaForm, formsForm]);

    const handleGeneralFormDraft = useCallback(() => {
        const generalFormValues = generalForm.getFieldsValue();
        const data = {
            ...generalFormValues,
            assessmentDeadlineDateUtc: generalFormValues.assessmentDeadlineDateUtc.utc().format(),
            submitDeadlineDateUtc: generalFormValues.submitDeadlineDateUtc.utc().format(),
        };

        if (isNewDraft) {
            createIssueDraft({ data, spaceId: spaceId! });
        } else {
            updateMyDraft({ data, spaceId: spaceId! });
        }
    }, [generalForm, isNewDraft, createIssueDraft, updateMyDraft, spaceId]);

    const handleMaterialDraft = useCallback(async () => {
        const data = await Promise.all(
            materials.map(async material => {
                let fileId = material.fileId;
                try {
                    if (material.type === 2 && !material.fileId && material.file) {
                        fileId = (await createFile(material.file)).id;
                    }
                } catch (error) {
                }

                return {
                    ...material,
                    fileId: material.type === 2 ? fileId : null,
                    text: material.type !== 2 ? material.text : null,
                    file: undefined,
                };
            }),
        );

        createIssueMaterialDraft({ spaceId: spaceId!, data });
    }, [materials, createIssueMaterialDraft, spaceId]);

    const handleCriteriaDraft = useCallback(async () => {
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

                return { ...crit, weight: crit.weight / 100, examples: resExamples };
            }),
        );

        createIssueCriteriaDraft({ spaceId: spaceId!, data });
    }, [criteria, createIssueCriteriaDraft, spaceId]);

    const handleFormsDraft = useCallback(() => {
        const data = forms.map(form => ({
            ...form,
            id: undefined,
        }));
        createIssueFormDraft({ spaceId: spaceId!, data: data as CreateIssueFormRequest[] });
    }, [createIssueFormDraft, spaceId, forms]);

    const handleChangeStep = useCallback(async (step: number) => {
        if (await validateForms()) return;

        switch (currentStep) {
            case 0:
                handleGeneralFormDraft();
                break;
            case 1:
                await handleMaterialDraft();
                break;
            case 2:
                await handleCriteriaDraft();
                break;
            case 3:
                handleFormsDraft();
                if (step === 4) {
                    setTimeout(() => saveMyDraft({ spaceId: spaceId! }), 2000);
                }
                break;
            default:
                break;
        }

        setCurrentStep(step);
    }, [
        validateForms, handleGeneralFormDraft, handleMaterialDraft, handleCriteriaDraft, handleFormsDraft,
        setCurrentStep, spaceId, saveMyDraft, currentStep,
    ]);

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
                            { title: 'Общее' },
                            { title: 'Материалы' },
                            { title: 'Критерии' },
                            { title: 'Форма сдачи' },
                        ]}
                    />
                    <CreateIssueButtons
                        currentStep={currentStep}
                        spaceId={spaceId}
                        handleChangeStep={handleChangeStep}
                    />
                </Flex>

                <CreateIssueForm
                    currentStep={currentStep}
                    isBlockForm={isBlockForm}
                    generalForm={generalForm}
                    spaceSettings={spaceSettings}
                    myIssueDraft={myIssueDraft}
                    materialsForm={materialsForm}
                    materials={materials}
                    setMaterials={setMaterials}
                    criteriaForm={criteriaForm}
                    criteria={criteria}
                    setCriteria={setCriteria}
                    formsForm={formsForm}
                    forms={forms}
                    setForms={setForms}
                />
            </Flex>

            <RestoreDraftModal
                isOpen={isOpenRestoreModal}
                onRestoreDraft={handleRestoreDraft}
                onDeleteDraft={handleDeleteDraft}
            />
        </>
    );
});
