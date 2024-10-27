import { FormInstance } from 'antd';
import { FC, useMemo } from 'react';

import { CreateIssueCriteriaDraftRequest } from '@features/issue/create-issue/model/CreateIssueCriteriaDraftRequest';
import { CreateIssueFormRequest } from '@features/issue/create-issue/model/CreateIssueFormRequest';
import { CreateIssueMaterialDraftRequest } from '@features/issue/create-issue/model/CreateIssueMaterialDraftRequest';
import { CreateIssueCriteriaForm } from '@features/issue/create-issue/ui/CreateIssueCriteriaForm';
import { CreateIssueFormForm } from '@features/issue/create-issue/ui/CreateIssueFormForm';
import { CreateIssueGeneralForm } from '@features/issue/create-issue/ui/CreateIssueGeneralForm';
import { CreateIssueMaterialsForm } from '@features/issue/create-issue/ui/CreateIssueMaterialsForm';

import { GetIssueDraftResponse } from '@entities/issue-draft';

import { typedMemo } from '@shared/lib';

type CreateIssueFormProps = {
    currentStep: number;
    isBlockForm: boolean;
    generalForm: FormInstance;
    spaceSettings?: {isUseTeam: boolean};
    myIssueDraft?: GetIssueDraftResponse;
    materialsForm: FormInstance;
    materials: CreateIssueMaterialDraftRequest[];
    setMaterials: (materials: CreateIssueMaterialDraftRequest[]) => void;
    criteriaForm: FormInstance;
    criteria: CreateIssueCriteriaDraftRequest[];
    setCriteria: (criteria: CreateIssueCriteriaDraftRequest[]) => void;
    formsForm: FormInstance;
    forms: CreateIssueFormRequest[];
    setForms: (forms: CreateIssueFormRequest[]) => void;
};

export const CreateIssueForm: FC<CreateIssueFormProps> = typedMemo(function CreateIssueForm({
    currentStep,
    isBlockForm,
    generalForm,
    spaceSettings,
    myIssueDraft,
    materialsForm,
    materials,
    setMaterials,
    criteriaForm,
    criteria,
    setCriteria,
    formsForm,
    forms,
    setForms,
}) {
    return useMemo(() => {
        switch (currentStep) {
            case 0:
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
            case 1:
                return (
                    <CreateIssueMaterialsForm
                        form={materialsForm}
                        materials={materials}
                        setMaterials={setMaterials}
                    />
                );
            case 2:
                return (
                    <CreateIssueCriteriaForm
                        form={criteriaForm}
                        criteria={criteria}
                        setCriteria={setCriteria}
                    />
                );
            case 3:
                return (
                    <CreateIssueFormForm
                        form={formsForm}
                        forms={forms}
                        setForms={setForms}
                    />
                );
            default:
                return null;
        }
    }, [currentStep, isBlockForm, generalForm, spaceSettings?.isUseTeam, myIssueDraft, materialsForm, materials,
        setMaterials, criteriaForm, criteria, setCriteria, formsForm, forms, setForms]);
});
