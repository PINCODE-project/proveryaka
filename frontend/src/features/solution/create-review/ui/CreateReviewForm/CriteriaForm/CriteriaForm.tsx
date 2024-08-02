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
    onSelect: (order: number) => void;
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
            content={
                ({ value, error }) => (
                    <FlexContainer
                        onClick={() => {
                            onSelect(order);
                        }}
                        className={getBemClasses(styles, null, { isOpen }, className)}
                        direction="column"
                        gap="m"
                    >
                        <FlexContainer direction="row" gap="s" justifyContent="space-between">
                            <FlexContainer direction="row" gap="xs">
                                <ChevronDown className={getBemClasses(styles, 'openArrowIcon')} />
                                {order}. {criteria.name}
                            </FlexContainer>

                            <Typography>{value.scoreCount}/{criteria.maxScore}</Typography>
                        </FlexContainer>

                        <FlexContainer direction="column" gap="m" className={getBemClasses(styles, 'additional')}>
                            <Typography>
                                {criteria.description}
                            </Typography>

                            <FlexContainer direction="column" gap="s">
                                <FormField<number>
                                    name={`reviewsByCriteria[${order}].scoreCount`}
                                    label={`Оценка (${criteria.minScore}-${criteria.maxScore}`}
                                    content={
                                        ({ onChange, value, isInvalid }) => (
                                            <InputNumber
                                                min={criteria.minScore}
                                                max={criteria.maxScore}
                                                value={value}
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
