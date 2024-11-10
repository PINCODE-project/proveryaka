import { Flex, Input, Typography } from 'antd';
import { FC, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { CreateTeamModal } from '@features/team/create-team';

import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import {
    useGetSpaceUserTeams,
    TeamType,
} from '@entities/team';
import { GetTeamFilters } from '@entities/team/model/GetTeamFilters';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback } from '@shared/ui';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps;

export const SpaceTeamsPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,
}) {
    const { isStudent } = useRolesCheck();
    const spaceId = useSpaceId();

    const { data: studentTeams } = useGetSpaceUserTeams(spaceId ?? '', undefined, {
        enabled: isStudent,
    });

    const [filters, setFilters] = useListFilters<GetTeamFilters>({
        teamType: TeamType.Space,
        page: undefined,
        count: undefined,
    });

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex gap={28} vertical className={ className}>
            <Flex align="center" justify="space-between" gap={16}>
                <Typography.Text>
                    <Input.Search
                        placeholder="Поиск"
                        allowClear
                        onSearch={search => {
                            setFilters({ search, page: 1 });
                        }}
                        style={{ width: 300 }}
                    />
                </Typography.Text>
                {isStudent && studentTeams?.entityList.length === 0 ? <CreateTeamModal spaceId={spaceId} /> : null}
            </Flex>

            <Suspense fallback={<Fallback />}>
                <Content filters={filters} setFilters={setFilters} />
            </Suspense>
        </Flex>
    );
});
