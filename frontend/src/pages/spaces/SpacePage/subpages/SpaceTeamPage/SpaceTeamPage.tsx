import { IconSettings, IconUsersPlus } from '@tabler/icons-react';
import { Button, CollapseProps, Collapse } from 'antd';
import { FC, useMemo } from 'react';

import { AddUserTeamModal } from '@features/team/add-user-team';
import { CreateTeamModal } from '@features/team/create-team';
import { EditTeamModal } from '@features/team/edit-team/ui/EditTeamModal';

import { UserTable } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { useGetSpaceTeams } from '@entities/team/lib/useGetSpaceTeams';
import { useGetSpaceUserTeams } from '@entities/team/lib/useGetSpaceUserTeams';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './SpaceTeamPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTeamPage: FC<Props> = typedMemo(function SpaceTeamPage({
    className,
}) {
    const spaceId = useSpaceId();
    const [filters] = useListFilters({ count: 15, page: 0 });
    const { isStudent, isOrganizer } = useRolesCheck();

    const { data: teams } = useGetSpaceTeams(spaceId ?? '', filters, {
        enabled: isOrganizer,
    });
    const { data: studentTeams } = useGetSpaceUserTeams(spaceId ?? '', filters, {
        enabled: isStudent,
    });

    const items = useMemo<CollapseProps['items']>(() =>
        (isOrganizer ? teams : studentTeams)?.teamList.map(team => ({
            key: team.id,
            label: <FlexContainer direction="row" justifyContent="space-between" alignItems="center">
                <Text className={getBemClasses(styles, 'collapseLabel')}>
                    {team.name}
                </Text>

                <FlexContainer direction="row" gap="s" alignItems="center"
                    onClick={event => event.stopPropagation()}
                >
                    <EditTeamModal
                        team={team}
                        triggerElement={open => (
                            <Button onClick={open} type="text">
                                <IconSettings className={getBemClasses(styles, 'actionIcon')} />
                            </Button>
                        )}
                        spaceId={spaceId ?? ''}
                    />

                    <AddUserTeamModal
                        team={team}
                        triggerElement={open => (
                            <Button onClick={open} type="text">
                                <IconUsersPlus className={getBemClasses(styles, 'actionIcon')} />
                            </Button>
                        )}
                        spaceId={spaceId ?? ''}
                    />
                </FlexContainer>
            </FlexContainer>,
            children: <UserTable isStudent={true} users={team.studentInfoList ?? []} />,
        })), [teams]);

    if (studentTeams?.teamList.length === 0 && isStudent) {
        return (
            <FlexContainer
                direction="column"
                overflow="nowrap"
                alignItems="center"
                className={getBemClasses(styles, null, null, className)}
            >
                <CreateTeamModal spaceId={spaceId ?? ''} />
            </FlexContainer>
        );
    }
    return (
        <FlexContainer
            direction="column"
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
        >
            <Collapse
                className={getBemClasses(styles, 'collapse')}
                items={items}
            />
        </FlexContainer>
    );
});
