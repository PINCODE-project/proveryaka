import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { useRolesCheck } from '@entities/space';

import { typedMemo } from '@shared/lib';

type Props = {
    spaceId: string;
};

export const SpaceIssuesButton: FC<Props> = typedMemo(function SpaceTeamsPage({
    spaceId,
}) {
    const navigate = useNavigate();

    const { isOrganizer } = useRolesCheck();

    const toCreateIssue = () => navigate(SpaceRouter.SpaceCreateIssue(spaceId || ''));

    if (isOrganizer) {
        return (
            <Button icon={<PlusOutlined />} onClick={toCreateIssue} type="primary">
                Создать задание
            </Button>
        );
    }
});
