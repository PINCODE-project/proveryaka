import { BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex, Pagination } from 'antd';
import { FC, useMemo, useState } from 'react';

import { useGetSolution } from '@entities/solution';
import { useGetOrganizerSolution } from '@entities/solution/lib/useGetOrganizerSolution';
import { SolutionFilledForms } from '@entities/solution/ui/SolutionFilledForms';
import { useRolesCheck } from '@entities/space';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceSolutionCommonPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceSolutionCommonPage: FC<Props> = typedMemo(function SpaceSolutionCommonPage() {
    const solutionId = useSolutionId();

    const { isOrganizer } = useRolesCheck();
    const { data: reviewerSolution } = useGetSolution(solutionId ?? '', { enabled: !isOrganizer });
    const { data: organizerSolution } = useGetOrganizerSolution(solutionId ?? '', { enabled: isOrganizer });
    const solution = useMemo(
        () => isOrganizer ? organizerSolution : reviewerSolution,
        [isOrganizer, organizerSolution, reviewerSolution],
    );

    const [isList, setIsList] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Flex vertical gap={32}>
            <Flex justify="space-between">
                <div className={styles.filledForms}>
                    <SolutionFilledForms
                        items={solution?.solutionValueList || []}
                        isList={isList}
                        currentStep={currentStep - 1}
                    />
                </div>

                <Flex vertical gap={20}>
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
            </Flex>
        </Flex>
    );
});
