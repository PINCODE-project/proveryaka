import { MenuProps } from 'antd';
import { FC, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { Outlet, Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { PageComponent } from '@widgets/PageComponent';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';
import { copySpaceCode, CopySpaceCode } from '@features/space/copy-space-code';
import { useDeleteSpace } from '@features/space/delete-space';
import { EditSpaceModal } from '@features/space/edit-space';
import { RegenerateSpaceCodeButton, useRegenerateSpaceCode } from '@features/space/regenerate-space-code';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';
import { useGetSpace } from '@entities/space/lib/useGetSpace';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import ChevronLeft from '@shared/assets/icons/ChevronLeft.svg';
import { useFileUrlById } from '@shared/hooks';
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
    const queryClient = useQueryClient();
    const spaceId = useSpaceId();
    const { data: space, error } = useGetSpace(spaceId ?? '');
    const [iconUrl] = useFileUrlById(space!.icon);
    const { isOrganizer, isStudent } = useRolesCheck();

    const { mutate: deleteSpace, isLoading } = useDeleteSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId ?? ''));
        },
    });

    const { mutate: regenerateCode } = useRegenerateSpaceCode({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId ?? ''));
        },
    });

    const settingsItem = useMemo(() => {
        let items: MenuProps['items'] = [];

        if (isOrganizer) {
            items = items.concat([
                {
                    key: 0,
                    label: <EditSpaceModal
                        triggerElement={open => <Text onClick={open}>Управление пространством</Text>}
                        spaceId={spaceId ?? ''}
                    />,
                },
                {
                    key: 1,
                    onClick: () => space?.inviteCode && copySpaceCode(space.inviteCode),
                    label: 'Скопировать код',
                    disabled: !space?.inviteCode,
                },
                {
                    key: 2,
                    onClick: () => regenerateCode(spaceId ?? ''),
                    label: 'Перегенерировать код',
                },
                {
                    key: 3,
                    label: <AddUserInSpaceModal
                        triggerElement={open => (<Text onClick={open}>Добавить пользователей</Text>)}
                        spaceId={spaceId ?? ''}
                    />,
                },
                {
                    type: 'divider',
                },
            ]);
        }

        items.push({
            danger: true,
            key: 4,
            label: 'Покинуть пространство',
        });

        if (isOrganizer) {
            items.push({
                danger: true,
                disabled: isLoading,
                key: 5,
                onClick: () => deleteSpace(spaceId ?? ''),
                label: 'Удалить пространство',
            });
        }

        return items;
    }, [spaceId, space, isOrganizer]);

    if (spaceId === undefined) {
        return <Navigate to={SpaceRouter.Main} />;
    }
    if (!space) {
        return null;
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
                        Все пространства
                    </Link>

                    <FlexContainer direction="row" alignItems="center" gap="s">
                        <Image
                            src={iconUrl}
                            alt="space avatar"
                            placeholderSrc={'https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled'}
                            className={getBemClasses(styles, 'avatar')}
                        />
                        <Text className={getBemClasses(styles, 'name')}>
                            {space.name}
                        </Text>
                    </FlexContainer>

                    {(isOrganizer || isStudent) ? <NavTab to={SpaceRouter.Tasks(spaceId)} name="Задания" /> : null}
                    <NavTab to={SpaceRouter.Works(spaceId)} name="Работы" />
                    {(isOrganizer || isStudent) ? <NavTab to={SpaceRouter.Users(spaceId)} name="Участники" /> : null}
                    {(isOrganizer || isStudent) ? <NavTab to={SpaceRouter.Team(spaceId)} name="Команды" /> : null}
                </FlexContainer>

                <SettingsDropdown
                    menu={{ items: settingsItem }}
                />
            </FlexContainer>

            <div className={getBemClasses(styles, 'content')}>
                <Outlet />
            </div>
        </PageComponent>
    );
});
