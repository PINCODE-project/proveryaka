import { InputNumber, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FC } from 'react';

import { CriteriaReviewByCriteria } from '@features/solution/create-review/model/CriteriaReviewByCriteria';

import { GetCriteriaResponse } from '@entities/criteria';

import ChevronDown from '@shared/assets/icons/ChevronDown.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, FormField } from '@shared/ui';

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
    return (
        <FormField<CriteriaReviewByCriteria>
            name={`reviewsByCriteria[${order}]`}
            className={getBemClasses(styles, 'field')}
            content={
                ({ value, error }) => (
                    <FlexContainer
                        className={getBemClasses(styles, null, { isOpen }, className)}
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
                                {order}. {criteria.name}
                            </FlexContainer>

                            <Typography className={getBemClasses(styles, 'score', { done: value.scoreCount !== null })}>
                                {value.scoreCount ?? '-'}/{criteria.maxScore}
                            </Typography>
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

                            <FlexContainer direction="column" gap="s">
                                <FormField<number>
                                    name={`reviewsByCriteria[${order}].scoreCount`}
                                    label={`Оценка: ${criteria.minScore}-${criteria.maxScore}`}
                                    content={
                                        ({ onChange, value, isInvalid }) => (
                                            <InputNumber
                                                min={criteria.minScore}
                                                max={criteria.maxScore}
                                                value={value}
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
