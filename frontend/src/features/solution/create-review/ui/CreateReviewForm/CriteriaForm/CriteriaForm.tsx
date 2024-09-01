import { InputNumber, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FC, useMemo } from 'react';

import { CriteriaReviewByCriteria } from '@features/solution/create-review/model/CriteriaReviewByCriteria';

import { GetCriteriaResponse } from '@entities/criteria';
import { ExampleType } from '@entities/example/common';
import { useGetCriteriaExamples } from '@entities/example/criteria-example';

import ChevronDown from '@shared/assets/icons/ChevronDown.svg';
import WarningCircle from '@shared/assets/icons/WarningCircle.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, FormField, SolutionExample } from '@shared/ui';

import styles from './CriteriaForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    order: number;
    isOpen: boolean;
    criteria: GetCriteriaResponse;
    onSelect: (order: number | null) => void;
}>;

export const CriteriaForm: FC<Props> = typedMemo(function CriteriaForm({
    order,
    isOpen,
    onSelect,
    criteria,
    className,
    'data-testid': dataTestId = 'CriteriaForm',
}) {
    const { data: examples } = useGetCriteriaExamples(criteria.id);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType == ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType == ExampleType.AntiExample) ?? [], [examples]);

    return (
        <FormField<CriteriaReviewByCriteria>
            name={`reviewsByCriteria[${order}]`}
            className={getBemClasses(styles, 'field')}
            content={
                ({ value, error }) => (
                    <FlexContainer
                        className={getBemClasses(
                            styles,
                            null,
                            {
                                isOpen,
                                isError: Boolean(error),
                                isDone: true,
                            },
                            className)}
                        direction="column"
                        gap="m"
                    >
                        <FlexContainer
                            direction="row"
                            overflow="nowrap"
                            gap="s"
                            onClick={() => {
                                onSelect(isOpen ? null : order);
                            }}
                            justifyContent="space-between"
                            className={getBemClasses(styles, 'header')}
                        >
                            <FlexContainer
                                direction="row"
                                gap="xs"
                                className={getBemClasses(styles, 'headerName')}
                                overflow="nowrap"
                                alignItems="start"
                            >
                                <ChevronDown className={getBemClasses(styles, 'openArrowIcon')} />
                                {order + 1}. {criteria.name}
                            </FlexContainer>

                            {value?.scoreCount !== null && value?.scoreCount !== undefined
                                ? (
                                    <Typography
                                        className={getBemClasses(styles, 'score', { done: value?.scoreCount !== null })}
                                    >
                                        {value?.scoreCount}/{criteria.maxScore}
                                    </Typography>
                                )
                                : error
                                    ? null
                                    : <WarningCircle className={getBemClasses(styles, 'warningIcon')} />}
                        </FlexContainer>

                        <FlexContainer
                            alignItems="stretch"
                            direction="column"
                            gap="s"
                            className={getBemClasses(styles, 'additional')}
                        >
                            <Typography className={getBemClasses(styles, 'criteriaDesc')}>
                                {criteria.description}
                            </Typography>

                            <SolutionExample
                                example={standardExamples}
                                antiExample={antiExamples}
                                triggerComponent={open => (
                                    <Typography onClick={open} className={getBemClasses(styles, 'exampleButton')}>
                                        Примеры выполнения
                                    </Typography>
                                )}
                            />

                            <Typography className={getBemClasses(styles, 'weight')}>
                                Вес критерия: {criteria.weight}
                            </Typography>

                            <FlexContainer direction="column" gap="s">
                                <FormField<number>
                                    name={`reviewsByCriteria[${order}].scoreCount`}
                                    label={`Оценка от ${criteria.minScore} до ${criteria.maxScore}:`}
                                    content={
                                        ({ onChange, value, isInvalid }) => (
                                            <InputNumber
                                                min={criteria.minScore}
                                                max={criteria.maxScore}
                                                value={value}
                                                status={isInvalid ? 'error' : undefined}
                                                className={getBemClasses(styles, 'numberField')}
                                                onChange={value => onChange(value ?? 0)}
                                            />
                                        )
                                    }
                                />
                                <FormField<string>
                                    name={`reviewsByCriteria[${order}].comment`}
                                    label={'Комментарий'}
                                    content={
                                        ({ onChange, value, isInvalid }) => (
                                            <TextArea
                                                value={value}
                                                showCount
                                                status={isInvalid ? 'error' : undefined}
                                                maxLength={2047}
                                                onChange={event => onChange(event.target.value)}
                                                onBlur={event => onChange(event.target.value.trim())}
                                            />
                                        )
                                    }
                                />
                            </FlexContainer>
                        </FlexContainer>
                    </FlexContainer>
                )
            }
        />
    );
});
