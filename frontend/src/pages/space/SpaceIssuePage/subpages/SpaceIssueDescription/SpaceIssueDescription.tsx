import { TeamOutlined, UserOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Col, Flex, Grid, Row, Typography } from 'antd';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { useGetIssue } from '@entities/issue';
import { useGetSpaceSettings } from '@entities/space';

import { useIssueId } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceIssueDescription.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceIssueDescription: FC<Props> = typedMemo(function SpaceIssueDescription({
}) {
    const spaceId = useSpaceId();
    const issueId = useIssueId();

    const { data: issue } = useGetIssue(issueId ?? '');
    const { data: spaceSettings } = useGetSpaceSettings(spaceId ?? '');

    if (!spaceId || !issueId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex vertical gap={40}>
            <Typography.Text className={styles.text}>
                {issue?.description}
            </Typography.Text>

            <Flex vertical gap={28}>
                <Flex align="center" gap={14}>
                    <Typography.Text className={styles.taskTitle}>
                        Тип сдачи заданий
                    </Typography.Text>

                    <Flex gap={4} align="center">
                        {spaceSettings?.isUseTeam
                            ? <>
                                <TeamOutlined className={styles.taskIcon} />
                                <Typography.Text>
                            Командный
                                </Typography.Text>
                            </>
                            : <>
                                <UserOutlined className={styles.taskIcon} />
                                <Typography.Text>
                                Индивидуальный
                                </Typography.Text>
                            </>
                        }
                    </Flex>
                </Flex>

                <Flex vertical gap={20}>
                    <Row gutter={[40, 0]}>
                        <Col flex="200px">
                            <Typography.Text className={styles.taskTitle}>
                               Сдача доступна до
                            </Typography.Text>
                        </Col>
                        <Col>
                            <Flex gap={16}>
                                <Flex gap={4}>
                                    <CalendarOutlined className={styles.taskIcon} />
                                    <Typography.Text>
                                        {getDateFromISO(issue?.submitDeadlineDateUtc ?? '')}
                                    </Typography.Text>
                                </Flex>
                                <Flex gap={4}>
                                    <ClockCircleOutlined className={styles.taskIcon} />
                                    <Typography.Text>
                                        {getTimeFromISO(issue?.submitDeadlineDateUtc ?? '')}
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>
                    <Row gutter={[40, 0]}>
                        <Col flex="200px">
                            <Typography.Text className={styles.taskTitle}>
                                Проверка доступна до
                            </Typography.Text>
                        </Col>
                        <Col>
                            <Flex gap={16}>
                                <Flex gap={4}>
                                    <CalendarOutlined className={styles.taskIcon} />
                                    <Typography.Text>
                                        {getDateFromISO(issue?.assessmentDeadlineDateUtc ?? '')}
                                    </Typography.Text>
                                </Flex>
                                <Flex gap={4}>
                                    <ClockCircleOutlined className={styles.taskIcon} />
                                    <Typography.Text>
                                        {getTimeFromISO(issue?.assessmentDeadlineDateUtc ?? '')}
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </Flex>
        </Flex>
    );
});
