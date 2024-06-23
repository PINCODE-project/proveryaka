import { type FC, PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { SpaceRouter } from '@pages/spaces';

import { NavItem } from '@widgets/PageComponent/NavItem/NavItem';

import Backpack from '@shared/assets/icons/Backpack.svg';
import PeopleTeam from '@shared/assets/icons/PeopleTeam.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

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
    const { t } = useTranslation();

    return (
        <FlexContainer
            direction="column"
            overflow="nowrap"
            data-testid={dataTestId}
            className={getBemClasses(styles, null, null, className)}
        >
            <header className={getBemClasses(styles, 'header')}>
                <div className={getBemClasses(styles, 'headerSide')}>
                    <PeopleTeam className={getBemClasses(styles, 'logo')} />
                </div>

                <div className={getBemClasses(styles, 'headerContent')}>
                    {headerContent}
                </div>

                <div className={getBemClasses(styles, 'headerSide', { isRight: true })}></div>
            </header>

            <main className={getBemClasses(styles, 'main')}>
                <nav className={getBemClasses(styles, 'navbar')}>
                    <NavItem to={SpaceRouter.Main} icon={<PeopleTeam />} name="Команды" />
                    <NavItem to={'/'} icon={<Backpack />} name="Задания" />
                </nav>

                <div className={getBemClasses(styles, 'content')}>
                    {children}
                </div>
            </main>
        </FlexContainer>
    );
});
