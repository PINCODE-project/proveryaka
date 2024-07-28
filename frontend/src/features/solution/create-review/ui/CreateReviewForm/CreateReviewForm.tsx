import { Formik } from 'formik';
import { FC } from 'react';

import { GetCriteriaResponse } from '@entities/criteria';
import { GetIssueResponse } from '@entities/issue';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateReviewForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: GetCriteriaResponse[];
    issue: GetIssueResponse;

}>;

export const CreateReviewForm: FC<Props> = typedMemo(function CreateReviewForm({
    className,
    'data-testid': dataTestId = 'CreateReviewForm',
}) {
    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >

        </div>
    );
});
