import { useField } from 'formik';
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
    const [fieldInput] = useField<CreateInfoWithFullInfo['criteriaList']>('criteriaList');

    const addCriteria = useCallback(() => {
        fieldInput.onChange(fieldInput.value.concat([{
            name: '',
            description: '',
            minScore: 0,
            maxScore: 0,
            weight: 0,
            criteriaExampleList: [],
        }]));
    }, [fieldInput]);

    return (
        <FormField<CreateInfoWithFullInfo['criteriaList']>
            name="criteriaList"
            content={
                ({ value }) => (
                    <>
                        {value.map((_, index) => (
                            <CriteriaItemContent index={index} key={index} />
                        ))}
                        <Button onClick={addCriteria}>
                            Добавить критерий
                        </Button>
                    </>
                )
            }
        />
    );
});
