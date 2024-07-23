import { useField, useFormikContext } from 'formik';
import { FC, useCallback, useMemo } from 'react';

import { CriteriaForm } from '@entities/criteria';
import { ExampleForm, ExampleType } from '@entities/example/common';

import Trash from '@shared/assets/icons/Trash.svg';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import { CreateInfoWithFullInfo } from '../../../../model/CreateInfoWithFullInfo';

export type Props = ClassNameProps & TestProps & Readonly<{
    index: number;
}>;

export const CriteriaItemContent: FC<Props> = typedMemo(function CriteriaItemContent({
    index,
}) {
    const formik = useFormikContext<CreateInfoWithFullInfo>();
    const exampleStandardIndex = useMemo(() => formik.values.criteriaList[index].criteriaExampleList.findIndex(example => example.exampleType === ExampleType.Standard), [formik, index]);
    const exampleAntiIndex = useMemo(() => formik.values.criteriaList[index].criteriaExampleList.findIndex(example => example.exampleType === ExampleType.AntiExample), [formik, index]);

    const addExample = useCallback((type: ExampleType) => {
        formik.values.criteriaList[index].criteriaExampleList.push({
            exampleType: type,
            exampleLink: '',
            description: '',
            textValue: '',
            fileIdValue: null,
        });
        formik.setFieldValue('criteriaList', formik.values.criteriaList);
    }, [formik, index]);

    const deleteCriteria = useCallback(() => {
        formik.setFieldValue('criteriaList', formik.values.criteriaList.filter((_, order) => order !== index));
    }, [index, formik]);

    const deleteExample = useCallback((exampleIndex: number) => {
        formik.setFieldValue(
            `criteriaList[${index}].criteriaExampleList`,
            formik.values.criteriaList[index].criteriaExampleList.filter((_, order) => order !== exampleIndex));
    }, [index, formik]);

    return (
        <div>
            <FlexContainer direction="column" gap="m">
                <CriteriaForm formParentFieldName={`criteriaList[${index}]`} />

                <FlexContainer direction="column" gap='s'>
                    <Text>Примеры выполнения критерия</Text>

                    {exampleStandardIndex !== -1
                        ? <>
                            <Text>Эталон</Text>
                            <ExampleForm formParentFieldName={`criteriaList[${index}].criteriaExampleList[${exampleStandardIndex}]`} /> :
                            <Button onClick={() => deleteExample(exampleStandardIndex)}>
                            Удалить эталон
                            </Button>
                        </>
                        : <Button onClick={() => addExample(ExampleType.Standard)}>
                            Добавить эталон
                        </Button>
                    }
                    {exampleAntiIndex !== -1
                        ? <>
                            <Text>Антипример</Text>
                            <ExampleForm formParentFieldName={`criteriaList[${index}].criteriaExampleList[${exampleAntiIndex}]`} /> :
                            <Button onClick={() => deleteExample(exampleAntiIndex)}>
                                Удалить антипример
                            </Button>
                        </>
                        : <Button onClick={() => addExample(ExampleType.AntiExample)}>
                            Добавить антипример
                        </Button>
                    }
                </FlexContainer>
            </FlexContainer>
            <button onClick={deleteCriteria}>
                <Trash />
            </button>
        </div>

    );
});
