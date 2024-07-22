import { Dropdown, MenuProps } from 'antd';
import { type FC, useCallback, useState } from 'react';

import { PageComponent } from '@widgets/PageComponent';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';
import { CopySpaceCode } from '@features/space/copy-space-code';
import { CreateSpaceModal } from '@features/space/create-space';
import { EditSpaceModal } from '@features/space/edit-space';
import { EnterSpaceByCodeModal } from '@features/space/enter-space-by-code';
import { RegenerateSpaceCodeButton } from '@features/space/regenerate-space-code';

import { GetSpaceFilters, SpaceCard, useGetSpaces } from '@entities/space';

import PeopleAdd from '@shared/assets/icons/PeopleAdd.svg';
import Settings from '@shared/assets/icons/Settings.svg';
import { useListFilters } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './SpacesPage.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{}>;

const buttonMenu: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <CreateSpaceModal triggerElement={open => <Text onClick={open}>Создать пространство</Text>} />
        ),
    },
    {
        key: '',
        label: <EnterSpaceByCodeModal triggerElement={open => <Text onClick={open}>Присоединиться к пространству</Text>} />,
    },
];

export const SpacesPage: FC<Props> = typedMemo(({
    className,
    'data-testid': dataTestId = 'SpacesPage',
}: Props) => {
    const [filters, changeFilter] = useListFilters({ page: 0, count: 15 });
    const { data, isLoading } = useGetSpaces(filters);

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
                <Text className={getBemClasses(styles, 'headerTitle')}>
                    Команды
                </Text>

                <Dropdown
                    menu={{ items: buttonMenu }}
                    placement="bottom"
                >
                    <Button
                        variant="outline"
                        className={getBemClasses(styles, 'addSpaceButton')}
                    >
                        <PeopleAdd className={getBemClasses(styles, 'addSpaceButtonIcon')} />
                        Присоединиться или создать команду
                    </Button>
                </Dropdown>

            </FlexContainer>

            <div className={getBemClasses(styles, 'spaces')}>
                {
                    data!.entityList!.map(space => (
                        <SpaceCard
                            space={space}
                            key={space.id}
                            actions={
                                <>
                                    <EditSpaceModal
                                        triggerElement={open => (
                                            <Button
                                                onClick={open}
                                                variant="ghost"
                                                size="small"
                                                className={getBemClasses(styles, 'settingsActionButton')}
                                            >
                                            Управление командой
                                            </Button>
                                        )}
                                        spaceId={space.id}
                                    />
                                    {space.inviteCode ? <CopySpaceCode inviteCode={space.inviteCode} /> : null}
                                    <RegenerateSpaceCodeButton spaceId={space.id} />
                                    <AddUserInSpaceModal
                                        triggerElement={open => (
                                            <Button
                                                onClick={open}
                                                variant="ghost"
                                                size="small"
                                                className={getBemClasses(styles, 'settingsActionButton')}
                                            >
                                                Добавить пользователей
                                            </Button>
                                        )}
                                        spaceId={space.id}
                                    />
                                </>
                            }
                        />))
                }
            </div>
        </PageComponent>
    );
});
