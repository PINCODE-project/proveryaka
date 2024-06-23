import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';

export type Props = TestProps & ClassNameProps & Readonly<{}>;

export const RedirectToTasks: FC<Props> = typedMemo(() => {
    const spaceId = useSpaceId();

    if (spaceId === undefined) {
        return <Navigate to={SpaceRouter.Main} />;
    }
    return <Navigate to={SpaceRouter.Tasks(spaceId)} />;
});
