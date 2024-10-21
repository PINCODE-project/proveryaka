import { FC } from 'react';

import { ResetPasswordForm } from '@features/auth/reset-password';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './ResetPasswordPage.module.css';

export type Props = ClassNameProps & TestProps;

export const ResetPasswordPage: FC<Props> = typedMemo(function SignUpPage({
    className,
}) {
    return (
        <FlexContainer
            direction="column"
            alignItems="center"
            justifyContent="center"
            overflow="nowrap"
            gap="m"
            className={getModuleClasses(styles, 'root', null, className)}
        >
            <FlexContainer direction="row" justifyContent="start" className={getModuleClasses(styles, 'header')}>
                <Logo />
            </FlexContainer>
            <ResetPasswordForm />
        </FlexContainer>
    );
});
