import { FC } from 'react';

import { SignInForm } from '@features/auth/signin';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
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
            overflow="nowrap"
            gap="m"
            className={getModuleClasses(styles, 'root', null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="row" justifyContent="start" className={getModuleClasses(styles, 'header')}>
                <Logo />
            </FlexContainer>
            <SignInForm />
        </FlexContainer>
    );
});
