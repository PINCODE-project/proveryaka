import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { TeamsTable } from '@entities/team';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceTeamsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTeamsPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,

}) {
    const spaceId = useSpaceId();

    console.log(spaceId);
    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <div className={getBemClasses(styles, null, null, className)}>
            <TeamsTable spaceId={spaceId} />
        </div>
    );
});
