import { useField } from 'formik';
import { FC, useCallback, useMemo } from 'react';

import { CreateInfoWithFullInfo } from '@features/issue/create-issue/model/CreateInfoWithFullInfo';

import { ExampleForm, ExampleType } from '@entities/example/common';

import Trash from '@shared/assets/icons/Trash.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer } from '@shared/ui';

import styles from './AntiExampleContent.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    exampleType: ExampleType;
}>;

export const ExampleContent: FC<Props> = typedMemo(function ExampleContent({
    className,
    exampleType,
    'data-testid': dataTestId = 'ExampleContent',
}) {
    const [fieldInput] = useField<CreateInfoWithFullInfo['issueExampleList']>('issueExampleList');

    const addExample = useCallback(() => {
        fieldInput.value.push({
            exampleType,
            exampleLink: '',
            description: '',
        });
        fieldInput.onChange(fieldInput.value);
    }, [fieldInput, exampleType]);

    const deleteExample = useCallback((index: number) => {
        fieldInput.onChange(fieldInput.value.filter((_, order) => order !== index));
    }, [fieldInput]);

    return (
        <FlexContainer direction="column" gap="s">
            {fieldInput.value.map((example, index) => (
                example.exampleType !== exampleType
                    ? null
                    : <div>
                        <ExampleForm formParentFieldName={`issueExampleList[${index}]`} />
                        <button onClick={() => deleteExample(index)}>
                            <Trash />
                        </button>
                    </div>
            ), [])}
            <Button onClick={addExample}>
                Добавить пример
            </Button>
        </FlexContainer>
    );
});
