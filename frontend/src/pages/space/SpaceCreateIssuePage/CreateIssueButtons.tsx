import { Button, Flex } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { typedMemo } from '@shared/lib';

import { SpaceRouter } from '../routes';

interface CreateIssueButtonsProps {
    currentStep: number;
    spaceId: string | undefined;
    handleChangeStep: (step: number) => void;
}

export const CreateIssueButtons: FC<CreateIssueButtonsProps> = typedMemo(function CreateIssueButtons({
    currentStep,
    spaceId,
    handleChangeStep,
}) {
    const navigate = useNavigate();

    const toIssuesPage = () => navigate(SpaceRouter.SpaceIssues(spaceId || ''));
    const toNextStep = () => handleChangeStep(currentStep + 1);

    return (
        <Flex gap="middle">
            <Button onClick={toIssuesPage}>Выйти</Button>
            <Button onClick={toNextStep} type="primary">
                {currentStep === 3 ? 'Создать' : 'Далее'}
            </Button>
        </Flex>
    );
});
