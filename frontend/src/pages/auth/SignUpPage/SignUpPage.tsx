import { FC } from 'react';

import { SignUpForm } from '@features/auth/signup';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
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
            overflow="nowrap"
            gap="m"
            className={getModuleClasses(styles, 'root', null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="row" justifyContent="start" className={getModuleClasses(styles, 'header')}>
                <Logo />
            </FlexContainer>
            <SignUpForm />
        </FlexContainer>
    );
});
