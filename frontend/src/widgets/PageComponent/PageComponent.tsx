import { IconUsersGroup } from '@tabler/icons-react';
import { type FC, PropsWithChildren, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

import { useAuthContext } from '@app/providers/AuthProvider';

import { SpaceRouter } from '@pages/spaces';

import { NavItem } from '@widgets/PageComponent/NavItem/NavItem';

import Logo from '@shared/assets/icons/Logo.svg';
import PeopleTeam from '@shared/assets/icons/PeopleTeam.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { Button, FlexContainer } from '@shared/ui';

import styles from './PageComponent.module.css';

export type Props = TestProps & ClassNameProps & PropsWithChildren & Readonly<{
    headerContent?: ReactNode;
}>;

export const PageComponent: FC<Props> = typedMemo(({
    className,
    headerContent,
    children,
    'data-testid': dataTestId = 'PageComponent',
}: Props) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { logout: logoutAuth } = useAuthContext();

    const logout = useCallback(() => {
        logoutAuth();
        queryClient.resetQueries();
    }, [logoutAuth]);

    return (
        <FlexContainer
            direction="column"
            overflow="nowrap"
            data-testid={dataTestId}
            className={getBemClasses(styles, null, null, className)}
        >
            <header className={getBemClasses(styles, 'header')}>
                <div className={getBemClasses(styles, 'headerSide')}>
                    <Logo className={getBemClasses(styles, 'logo')} />
                </div>

                <div className={getBemClasses(styles, 'headerContent')}>
                    {headerContent}
                </div>

                <div className={getBemClasses(styles, 'headerSide', { isRight: true })}></div>
            </header>

            <main className={getBemClasses(styles, 'main')}>
                <nav className={getBemClasses(styles, 'navbar')}>
                    <div>
                        <NavItem to={SpaceRouter.Main} icon={<IconUsersGroup />} name="Пространства" />
                    </div>
                    <div>
                        <Button variant="outline" onClick={logout}>Выйти</Button>
                    </div>
                </nav>

                <div className={getBemClasses(styles, 'content')}>
                    {children}
                </div>
            </main>
        </FlexContainer>
    );
});
