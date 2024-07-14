import { FC } from 'react';

import { SignInForm } from '@features/auth/signin';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './SignInPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SignInPage: FC<Props> = typedMemo(function SignInPage({
    className,
    'data-testid': dataTestId = 'SignInPage',
}) {
    return (
        <FlexContainer
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <SignInForm />
        </FlexContainer>
    );
});
