import { BookOutlined, EyeInvisibleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Pagination, Typography } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';
import { ReviewSolutionMenu } from '@pages/space/SpaceReviewSolutionPage/ReviewSolutionMenu/ReviewSolutionMenu';

import { UserPanel } from '@widgets/UserPanel';

import { useGetIssueCriteriaWithExamples } from '@entities/criteria/lib/useGetIssueCriteriaWithExamples';
import { useGetIssue } from '@entities/issue';
import { useGetSolution } from '@entities/solution';
import { useGetOrganizerSolution } from '@entities/solution/lib/useGetOrganizerSolution';
import { SolutionFilledForms } from '@entities/solution/ui/SolutionFilledForms';
import { useRolesCheck } from '@entities/space';

import Logo from '@shared/assets/images/logo.svg';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getModuleClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceReviewSolutionPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceReviewSolutionPage: FC<Props> = typedMemo(
    function SpaceReviewSolutionPage() {
        const spaceId = useSpaceId();
        const solutionId = useSolutionId();

        const { isOrganizer } = useRolesCheck();
        const { data: reviewerSolution } = useGetSolution(solutionId ?? '', {
            enabled: !isOrganizer,
        });
        const { data: organizerSolution } = useGetOrganizerSolution(
            solutionId ?? '',
            { enabled: isOrganizer },
        );
        const solution = useMemo(
            () => (isOrganizer ? organizerSolution : reviewerSolution),
            [isOrganizer, organizerSolution, reviewerSolution],
        );

        const { data: issue } = useGetIssue(solution?.issueId || '', {
            enabled: !!solution,
        });

        const { data: criteria } = useGetIssueCriteriaWithExamples(solution?.issueId || '', {}, {
            enabled: !!solution,
        });

        const [criteriaId, setCriteriaId] = useState<string | null>(null);

        const [isList, setIsList] = useState(true);
        const [currentStep, setCurrentStep] = useState(1);
        const [hasError, setHasError] = useState(false);

        const [reviewForm] = Form.useForm();

        const onSubmit = async () => {
            if (!hasError) {
                if (await reviewForm.validateFields().then(() => true).catch(() => false)) {
                    console.log('GO');
                } else {
                    setHasError(true);
                }
            }
        };

        useEffect(() => {
            if (hasError) setTimeout(() => setHasError(false), 2000);
        }, [hasError]);

        console.log('criteriaId', criteriaId);

        return (
            <Flex vertical gap="large" className={getModuleClasses(styles, 'root')}>
                <Flex justify="space-between" gap="middle">
                    <Link to={SpaceRouter.Spaces}>
                        <Logo />
                    </Link>
                    <Typography.Text>
                        <UserPanel />
                    </Typography.Text>
                </Flex>
                <Flex gap={60} className={getModuleClasses(styles, 'container')}>
                    <ReviewSolutionMenu
                        solution={solution}
                        criteria={criteria?.entityList || []}
                        form={reviewForm}
                        setCriteriaId={setCriteriaId}
                    />

                    <Flex vertical gap={30} className={getModuleClasses(styles, 'content')}>
                        <Flex justify="space-between" align="center">
                            {
                                !criteriaId &&
                                <Flex gap={20}>
                                    {
                                        isList
                                            ? <Button
                                                color="primary"
                                                variant="outlined"
                                                type="primary"
                                                size="small"
                                                onClick={() => setIsList(false)}
                                                icon={<BookOutlined />}
                                            >
                                                Страничный вид
                                            </Button>
                                            : <>
                                                <Pagination
                                                    simple
                                                    current={currentStep}
                                                    onChange={value => setCurrentStep(value)}
                                                    total={solution?.solutionValueList.length}
                                                    pageSize={1}
                                                />
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => setIsList(true)}
                                                    icon={<UnorderedListOutlined />}
                                                >
                                                    Отобразить списком
                                                </Button>
                                            </>
                                    }
                                </Flex>
                            }
                            {
                                criteriaId
                                    ? <Flex className={styles.button} gap={6} onClick={() => setCriteriaId(null)}>
                                        <EyeInvisibleOutlined />
                                        Закрыть пример
                                    </Flex>
                                    : null
                            }

                            <Flex gap={12}>
                                <Button color="default">Выйти</Button>
                                <Button
                                    variant="solid"
                                    color={hasError ? 'danger' : 'primary'}
                                    danger={hasError}
                                    onClick={onSubmit}
                                >
                                    Сохранить
                                </Button>
                            </Flex>
                        </Flex>

                        <div className={styles.filledForms}>
                            {
                                !criteriaId &&
                                <SolutionFilledForms
                                    items={solution?.solutionValueList || []}
                                    isList={isList}
                                    currentStep={currentStep - 1}
                                />
                            }
                            {
                                criteriaId ? <Typography>awd</Typography> : null
                            }
                        </div>
                    </Flex>
                </Flex>
            </Flex>
        );
    },
);
