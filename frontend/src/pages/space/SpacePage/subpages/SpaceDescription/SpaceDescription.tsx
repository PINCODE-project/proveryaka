import { TeamOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { useGetSpaceSettings } from '@entities/space';
import { useGetSpace } from '@entities/space/lib/useGetSpace';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceDescription.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceDescription: FC<Props> = typedMemo(function SpaceDescription({
}) {
    const spaceId = useSpaceId();
    const { data: space } = useGetSpace(spaceId ?? '');
    const { data: spaceSettings } = useGetSpaceSettings(spaceId ?? '');

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex vertical gap={32}>
            <Typography.Text className={styles.text}>
                {space?.description}
            </Typography.Text>

            {spaceSettings?.isUseTeam
                ? <Flex align="center" gap={14}>
                    <Typography.Text className={styles.taskTitle}>
                        Тип сдачи заданий
                    </Typography.Text>

                    <Flex gap={4} align="center">
                        <TeamOutlined className={styles.taskIcon} />
                        <Typography.Text>
                            Командный
                        </Typography.Text>
                    </Flex>
                </Flex>
                : null}
        </Flex>
    );
});
