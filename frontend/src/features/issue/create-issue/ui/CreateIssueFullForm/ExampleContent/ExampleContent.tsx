import { useField, useFormikContext } from 'formik';
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
    const formik = useFormikContext<CreateInfoWithFullInfo>();

    const addExample = useCallback(() => {
        formik.values.issueExampleList.push({
            exampleType,
            exampleLink: '',
            description: '',
            textValue: '',
            fileIdValue: null,
        });
        formik.setFieldValue('issueExampleList', formik.values.issueExampleList);
    }, [formik, exampleType]);

    const deleteExample = useCallback((index: number) => {
        formik.setFieldValue('issueExampleList', formik.values.issueExampleList.filter((_, order) => order !== index));
    }, [formik]);

    return (
        <FlexContainer direction="column" gap="s">
            {formik.values.issueExampleList.map((example, index) => (
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
