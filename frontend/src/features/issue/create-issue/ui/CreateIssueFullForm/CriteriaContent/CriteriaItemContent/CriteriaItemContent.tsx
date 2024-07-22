import { useField } from 'formik';
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
    const [fieldInput] = useField<CreateInfoWithFullInfo['criteriaList']>('criteriaList');
    const exampleStandardIndex = useMemo(() => fieldInput.value[index].criteriaExampleList.findIndex(example => example.exampleType === ExampleType.Standard), [fieldInput, index]);
    const exampleAntiIndex = useMemo(() => fieldInput.value[index].criteriaExampleList.findIndex(example => example.exampleType === ExampleType.AntiExample), [fieldInput, index]);

    const addExample = useCallback((type: ExampleType) => {
        fieldInput.value[index].criteriaExampleList.push({
            exampleType: type,
            exampleLink: '',
            description: '',
        });
        fieldInput.onChange(fieldInput.value);
    }, [fieldInput, index]);

    const deleteCriteria = useCallback(() => {
        fieldInput.onChange(fieldInput.value.filter((_, order) => order !== index));
    }, [index, fieldInput]);

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
                        </>
                        : <Button onClick={() => addExample(ExampleType.Standard)}>
                            Добавить эталон
                        </Button>
                    }
                    {exampleAntiIndex !== -1
                        ? <>
                            <Text>Антипример</Text>
                            <ExampleForm formParentFieldName={`criteriaList[${index}].criteriaExampleList[${exampleAntiIndex}]`} /> :
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
