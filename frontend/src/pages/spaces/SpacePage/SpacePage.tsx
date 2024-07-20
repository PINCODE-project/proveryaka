import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { PageComponent } from '@widgets/PageComponent';

import { EditSpaceModal } from '@features/space/edit-space';

import ChevronLeft from '@shared/assets/icons/ChevronLeft.svg';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { FlexContainer, Image, Link, SettingsDropdown, Text } from '@shared/ui';

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
                    <NavTab to={SpaceRouter.Works(0, 0)} name="Работы" />
                    <NavTab to={SpaceRouter.Users(0)} name="Участники" />
                </FlexContainer>

                <SettingsDropdown
                    menu={{
                        items: [
                            {
                                key: 0,
                                label: <EditSpaceModal
                                    triggerElement={open => <Text onClick={open}>Управление командой</Text>}
                                    spaceId={''}
                                />,
                            },
                            {
                                key: 1,
                                label: 'Покинуть пространство',
                            },
                            {
                                key: 2,
                                label: 'Удалить пространство',
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
