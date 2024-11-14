import { BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Pagination, Spin, Typography } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { useCreateReview } from '@features/solution/create-review/lib/useCreateReview';

import { useGetIssueCriteriaWithExamples } from '@entities/criteria/lib/useGetIssueCriteriaWithExamples';
import { useGetSolution } from '@entities/solution';
import { getSolutionQueryKey } from '@entities/solution/lib/getSolutionQueryKey';
import { useGetOrganizerSolution } from '@entities/solution/lib/useGetOrganizerSolution';
import { SolutionFilledForms } from '@entities/solution/ui/SolutionFilledForms';
import { useRolesCheck } from '@entities/space';

import Logo from '@shared/assets/images/logo.svg';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getModuleClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { ReviewSolutionMenu } from './ReviewSolutionMenu/ReviewSolutionMenu';
import styles from './SpaceReviewSolutionPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceReviewSolutionPage: FC<Props> = typedMemo(
    function SpaceReviewSolutionPage() {
        const navigate = useNavigate();
        const queryClient = useQueryClient();
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

        const { data: criteria } = useGetIssueCriteriaWithExamples(solution?.issueId || '', {}, {
            enabled: !!solution,
        });

        const { mutate: createReview } = useCreateReview({
            retry: false,
            onSuccess: () => {
                queryClient.invalidateQueries(getSolutionQueryKey(solutionId!));
                navigate(SpaceRouter.SpaceSolution(spaceId!, solutionId!));
            },
        });

        const [isList, setIsList] = useState(true);
        const [currentStep, setCurrentStep] = useState(1);
        const [hasError, setHasError] = useState(false);

        const [reviewForm] = Form.useForm();

        const onSubmit = async () => {
            if (!hasError) {
                if (await reviewForm.validateFields().then(() => true).catch(() => false)) {
                    const values = reviewForm.getFieldsValue();
                    const data = {
                        solutionId: solutionId!,
                        likeType: 0,
                        reviewsByCriteria: values.reviewsByCriteria.map((rev: any) => ({
                            criteriaId: rev.id,
                            scoreCount: rev.scoreCount,
                            comment: rev.comment,
                        })),
                        comment: values.comment,
                    };
                    createReview(data);
                } else {
                    setHasError(true);
                }
            }
        };

        useEffect(() => {
            if (hasError) {
                setTimeout(() => setHasError(false), 2000);
            }
        }, [hasError]);

        if (!solution || !criteria) {
            return <Spin />;
        }

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
                        solution={solution!}
                        criteria={criteria?.entityList || []}
                        form={reviewForm}
                        hasError={hasError}
                    />

                    <Flex vertical gap={30} className={getModuleClasses(styles, 'content')}>
                        <Flex justify="space-between" align="center">
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

                            <Flex gap={12}>
                                <Button
                                    color="default"
                                    onClick={() => navigate(SpaceRouter.SpaceSolution(spaceId!, solutionId!))}
                                >
                                    Выйти
                                </Button>
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
                            <SolutionFilledForms
                                items={solution?.solutionValueList || []}
                                isList={isList}
                                currentStep={currentStep - 1}
                            />
                        </div>
                    </Flex>
                </Flex>
            </Flex>
        );
    },
);
