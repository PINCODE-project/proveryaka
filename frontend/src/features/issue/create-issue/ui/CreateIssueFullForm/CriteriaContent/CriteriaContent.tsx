import { useField, useFormikContext } from 'formik';
import { FC, useCallback } from 'react';

import { CreateInfoWithFullInfo } from '@features/issue/create-issue/model/CreateInfoWithFullInfo';
import {
    CriteriaItemContent,
} from '@features/issue/create-issue/ui/CreateIssueFullForm/CriteriaContent/CriteriaItemContent';

import { CriteriaForm } from '@entities/criteria';
import { ExampleForm, ExampleType } from '@entities/example/common';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Text } from '@shared/ui';

import styles from './CriteriaContent.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const CriteriaContent: FC<Props> = typedMemo(function CriteriaContent({}) {
    const formik = useFormikContext<CreateInfoWithFullInfo>();

    const addCriteria = useCallback(() => {
        const criteria = formik.values.criteriaList;
        formik.setFieldValue('criteriaList', (criteria ?? []).concat([{
            name: '',
            description: '',
            minScore: 0,
            maxScore: 0,
            weight: 0,
            criteriaExampleList: [],
        }]));
    }, [formik]);

    return (
        <FormField<CreateInfoWithFullInfo['criteriaList']>
            name="criteriaList"
            content={
                ({ value }) => (
                    <FlexContainer direction="column" gap="m">
                        {value.map((_, index) => (
                            <CriteriaItemContent index={index} key={index} />
                        ))}
                        <Button onClick={addCriteria}>
                            Добавить критерий
                        </Button>
                    </FlexContainer>
                )
            }
        />
    );
});
