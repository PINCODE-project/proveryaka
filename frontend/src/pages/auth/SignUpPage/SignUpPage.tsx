import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './SignUpPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SignUpPage: FC<Props> = typedMemo(function SignUpPage({
    className,
    'data-testid': dataTestId = 'SignUpPage',
}) {
    return (
        <FlexContainer
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
        </FlexContainer>
    );
});
