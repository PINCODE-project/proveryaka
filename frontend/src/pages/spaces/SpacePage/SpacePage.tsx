import { FC } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { PageComponent } from '@widgets/PageComponent';

import ChevronLeft from '@shared/assets/icons/ChevronLeft.svg';
import Settings from '@shared/assets/icons/Settings.svg';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { Button, FlexContainer, Image, Link, SettingsDropdown, Text } from '@shared/ui';

import { NavTab } from './NavTab/NavTab';
import styles from './SpacePage.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{}>;

export const SpacePage: FC<Props> = typedMemo(({
    className,
    'data-testid': dataTestId = 'SpacePage',
}: Props) => {
    const spaceId = useSpaceId();

    if (spaceId === undefined) {
        return <Navigate to={SpaceRouter.Main} />;
    }
    return (
        <PageComponent
            data-testid={dataTestId}
            className={getBemClasses(styles, null, null, className)}
        >
            <FlexContainer
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap="m"
                className={getBemClasses(styles, 'header')}
            >
                <FlexContainer
                    direction="row"
                    alignItems="center"
                    gap="m"
                >
                    <Link to={SpaceRouter.Main} className={getBemClasses(styles, 'backLink')}>
                        <ChevronLeft className={getBemClasses(styles, 'backLinkIcon')} />
                        Все команды
                    </Link>

                    <FlexContainer direction="row" alignItems="center" gap="s">
                        <Image
                            alt="space avatar"
                            placeholderSrc={'https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled'}
                            className={getBemClasses(styles, 'avatar')}
                        />
                        <Text className={getBemClasses(styles, 'name')}>
                        Name
                        </Text>
                    </FlexContainer>

                    <NavTab to={SpaceRouter.Tasks(0)} name="Задания" />
                    <NavTab to={SpaceRouter.Appeals(0)} name="Аппеляции" />
                    <NavTab to={SpaceRouter.Users(0)} name="Участники" />
                </FlexContainer>

                <SettingsDropdown
                    menu={{
                        items: [
                            {
                                key: 0,
                                label: 'Управление командой',
                                icon: <Settings className={getBemClasses(styles, 'settingsActionButtonIcon')} />,
                            },
                        ],
                    }}
                />
            </FlexContainer>

            <div className={getBemClasses(styles, 'content')}>
                <Outlet />
            </div>
        </PageComponent>
    );
});
