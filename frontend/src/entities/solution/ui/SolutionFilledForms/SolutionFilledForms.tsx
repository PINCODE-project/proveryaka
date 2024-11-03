import { Flex } from 'antd';
import { FC } from 'react';

import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';
import { SolutionFilledForm } from '@entities/solution/ui/SolutionFilledForm';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

export type Props = ClassNameProps & TestProps & Readonly<{
    items: GetSolutionValue[];
    isList: boolean;
    currentStep: number;
}>;

export const SolutionFilledForms: FC<Props> = typedMemo(function SolutionFilledForms({
    items,
    isList,
    currentStep,
}) {
    return (
        <Flex vertical gap={36}>
            {
                isList
                    ? items.map(form => {
                        return <SolutionFilledForm form={form} key={`solutionFilledForm${form.id}`} />;
                    })
                    : (
                        <SolutionFilledForm
                            form={items[currentStep]}
                            key={`solutionFilledForm${items[currentStep].id}`}
                        />
                    )
            }
        </Flex>
    );
});
