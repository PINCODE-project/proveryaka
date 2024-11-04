import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { DistributeModal, useDistributeExpertToSolution } from '@features/solution/distribute-experts';

import { SolutionsTable, GetSolutionForExpert } from '@entities/solution';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceSolutionsPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceSolutionsPage: FC<Props> = typedMemo(function SpaceSolutionsPage({
    className,

}) {
    const { isOrganizer } = useRolesCheck();
    const spaceId = useSpaceId();

    const { mutate: distribute } = useDistributeExpertToSolution();

    const renderActions = useCallback((_: string, record: GetSolutionForExpert) => {
        if (!isOrganizer) {
            return undefined;
        }

        const items: MenuProps['items'] = [
            {
                key: '1',
                label: <DistributeModal
                    onSubmit={(onClose, expertIdList) => distribute({ expertIdList, solutionId: record.id }, { onSuccess: onClose })}
                    triggerComponent={
                        open => (
                            <Typography onClick={open} className={styles.menuItem}>
                                Назначить проверяющих
                            </Typography>
                        )
                    }
                />,
            },
        ];

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, [isOrganizer]);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex gap={28} vertical className={ className}>
            <Flex align="center" gap={16}>
                <Typography.Text>
                    Filters
                </Typography.Text>
            </Flex>

            <SolutionsTable
                spaceId={spaceId}
                actionRender={renderActions}
            />
        </Flex>
    );
});
