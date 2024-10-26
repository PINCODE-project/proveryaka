import { FC } from 'react';

import { ResetPasswordSubmitForm } from '@features/auth/reset-password';

import Logo from '@shared/assets/images/logo.svg';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './ResetPasswordSubmitPage.module.css';

export type Props = ClassNameProps & TestProps;

export const ResetPasswordSubmitPage: FC<Props> = typedMemo(function ResetPasswordSubmitPage({
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
            <ResetPasswordSubmitForm />
        </FlexContainer>
    );
});
