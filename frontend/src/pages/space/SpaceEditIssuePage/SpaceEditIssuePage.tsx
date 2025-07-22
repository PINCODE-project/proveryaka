import { Flex, Form, FormInstance, Spin, Steps, Typography } from 'antd';
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
import { useCreateIssueFormDraft } from '@features/issue/create-issue/lib/useCreateIssueFormDraft';
import { useCreateIssueMaterialDraft } from '@features/issue/create-issue/lib/useCreateIssueMaterialDraft';
import { CreateIssueCriteriaDraftRequest } from '@features/issue/create-issue/model/CreateIssueCriteriaDraftRequest';
import {
    CreateIssueCriteriaExampleDraftRequest,
} from '@features/issue/create-issue/model/CreateIssueCriteriaExampleDraftRequest';
import { CreateIssueFormRequest } from '@features/issue/create-issue/model/CreateIssueFormRequest';
import { CreateIssueMaterialDraftRequest } from '@features/issue/create-issue/model/CreateIssueMaterialDraftRequest';
import { useEditIssue } from '@features/issue/edit-issue/lib/useEditIssue';

import { useGetIssueCriteriaWithExamples } from '@entities/criteria/lib/useGetIssueCriteriaWithExamples';
import { GetIssueResponse, useGetIssue, useGetIssueMaterials } from '@entities/issue';
import { getMyIssueDraftQueryKey } from '@entities/issue-draft';
import { useGetSpaceSettings, useRolesCheck } from '@entities/space';

import { createFile } from '@shared/api/file/createFile';
import Logo from '@shared/assets/images/logo.svg';
import { useIssueId } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceCreateIssuePage.module.css';
import { SpaceRouter } from '../routes';

export type Props = ClassNameProps & TestProps;

dayjs.extend(utc);

export const SpaceEditIssuePage: FC<Props> = typedMemo(function SpaceEditIssuePage({
    className,
}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const spaceId = useSpaceId();
    const issueId = useIssueId();

    const { isOrganizer } = useRolesCheck();

    useEffect(() => {
        if (!isOrganizer) {
            navigate(SpaceRouter.SpaceIssues(spaceId!));
        }
    }, [isOrganizer, navigate, spaceId]);

    const [currentStep, setCurrentStep] = useState(0);

    const { data: spaceSettings } = useGetSpaceSettings(spaceId ?? '');

    const { mutate: createIssueMaterialDraft } = useCreateIssueMaterialDraft({ retry: false });
    const { mutate: createIssueCriteriaDraft } = useCreateIssueCriteriaDraft({ retry: false });
    const { mutate: createIssueFormDraft } = useCreateIssueFormDraft({ retry: false });
    const { mutate: editIssue } = useEditIssue({
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
    const [myIssueDraft, setMyIssueDraft] = useState<GetIssueResponse | null>(null);
    const [materials, setMaterials] = useState<CreateIssueMaterialDraftRequest[]>([]);
    const [criteria, setCriteria] = useState<CreateIssueCriteriaDraftRequest[]>([]);
    const [forms, setForms] = useState<CreateIssueFormRequest[]>([]);

    const { data: getCriteria } = useGetIssueCriteriaWithExamples(issueId!, {});
    const { data: getMaterials } = useGetIssueMaterials(issueId!);

    const { data: getIssue } = useGetIssue(issueId!, {
        onSuccess: draft => {

            // if (isBlockForm) {
            //     if (draft) {
            //         setIsOpenRestoreModal(true);
            //

            //
            //
            //         setForms(draft.forms!.map(form => ({ ...form, id: uuid() })) as CreateIssueFormRequest[]);
            //     }
            // }
        },
        useErrorBoundary: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    useEffect(() => {
        if (getIssue) {
            setMyIssueDraft(getIssue!);
        }
    }, [getIssue]);

    useEffect(() => {
        if (getMaterials) {
            setMaterials(getMaterials.entityList!.map(material => ({
                ...material, id: uuid(), file: null,
            })) as CreateIssueMaterialDraftRequest[]);
        }
    }, [getMaterials]);

    useEffect(() => {
        if (getCriteria) {
            setCriteria(getCriteria.entityList!.map(crit => ({
                ...crit,
                id: uuid(),
                weight: crit.weight * 100,
                examples: crit.criteriaExampleList.map(example => ({
                    ...example,
                    id: uuid(),
                    file: null,
                })) as CreateIssueCriteriaExampleDraftRequest[],
            })) as CreateIssueCriteriaDraftRequest[]);
        }
    }, [getCriteria]);

    console.log(getIssue, myIssueDraft, 'ISSUE');

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
            id: issueId!,
            assessmentDeadlineDateUtc: generalFormValues.assessmentDeadlineDateUtc.utc().format(),
            submitDeadlineDateUtc: generalFormValues.submitDeadlineDateUtc.utc().format(),
        };

        editIssue(data);
    }, [generalForm, editIssue]);

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
        if (step > currentStep + 1) return;

        if (currentStep === 3 && step === 4) {
            handleGeneralFormDraft();
            await handleMaterialDraft();
            await handleCriteriaDraft();
            handleFormsDraft();
        }

        setCurrentStep(step);
    }, [validateForms, handleGeneralFormDraft, handleMaterialDraft, handleCriteriaDraft, handleFormsDraft,
        setCurrentStep, currentStep]);

    if (!myIssueDraft || !materials || !criteria) {
        return <Spin />;
    }

    return (
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
                        { title: 'Общее', status: currentStep === 0 ? 'process' : 'finish' },
                        { title: 'Материалы', status: currentStep === 1 ? 'process' : 'finish' },
                        { title: 'Критерии', status: currentStep === 2 ? 'process' : 'finish' },
                        { title: 'Форма сдачи', status: currentStep === 3 ? 'process' : 'finish' },
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
                isBlockForm={false}
                generalForm={generalForm}
                spaceSettings={spaceSettings}
                myIssueDraft={{ ...myIssueDraft, materials: [], criteria: [], forms: [] }}
                materialsForm={materialsForm}
                materials={materials}
                setMaterials={setMaterials}
                criteriaForm={criteriaForm}
                criteria={criteria}
                setCriteria={setCriteria}
                formsForm={formsForm}
                forms={forms}
                setForms={setForms}
                isEdit={true}
            />
        </Flex>
    );
});
