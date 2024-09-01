import { IconUsersPlus } from '@tabler/icons-react';
import { Dropdown, MenuProps } from 'antd';
import { type FC, useMemo } from 'react';
import { useQuery } from 'react-query';

import { PageComponent } from '@widgets/PageComponent';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';
import { CopySpaceCode } from '@features/space/copy-space-code';
import { CreateSpaceModal } from '@features/space/create-space';
import { EditSpaceModal } from '@features/space/edit-space';
import { EnterSpaceByCodeModal } from '@features/space/enter-space-by-code';
import { RegenerateSpaceCodeButton } from '@features/space/regenerate-space-code';

import { SpaceCard, useGetSpaces } from '@entities/space';

import { ssoHttp } from '@shared/config/axios';
import { extractData, getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './SpacesPage.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{}>;

export const SpacesPage: FC<Props> = typedMemo(({
    className,
    'data-testid': dataTestId = 'SpacesPage',
}: Props) => {
    const { data, isLoading } = useGetSpaces();
    const { data: isOrganizer } = useQuery('userinfo', async () => {
        const a: any = await ssoHttp.get('connect/userinfo').then(extractData);
        return a.role === 'admin';
    });

    const buttonMenu: MenuProps['items'] = useMemo(() => {
        const menu = [];
        if (isOrganizer) {
            menu.push({
                key: '1',
                label: (
                    <CreateSpaceModal triggerElement={open => <Text onClick={open}>Создать пространство</Text>} />
                ),
            });
        }
        menu.push({
            key: '',
            label: <EnterSpaceByCodeModal
                triggerElement={open => <Text onClick={open}>Присоединиться к пространству</Text>}
            />,
        });

        return menu;
    }, [isOrganizer]);

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
                    Пространства
                </Text>

                {isOrganizer
                    ? <Dropdown
                        menu={{ items: buttonMenu }}
                        placement="bottom"
                    >
                        <Button
                            variant="outline"
                            className={getBemClasses(styles, 'addSpaceButton')}
                        >
                            <IconUsersPlus className={getBemClasses(styles, 'addSpaceButtonIcon')} />
                            Присоединиться или создать пространство
                        </Button>
                    </Dropdown>
                    : <EnterSpaceByCodeModal
                        triggerElement={open =>
                            (<Button
                                onClick={open}
                                variant="outline"
                                className={getBemClasses(styles, 'addSpaceButton')}
                            >
                                <IconUsersPlus className={getBemClasses(styles, 'addSpaceButtonIcon')} />
                                Присоединиться к пространству
                            </Button>)}
                    />}

            </FlexContainer>

            <div className={getBemClasses(styles, 'spaces')}>
                {
                    data!.entityList!.map(space => (
                        <SpaceCard
                            space={space}
                            key={space.id}
                            actions={
                                isOrganizer
                                    ? <>
                                        <EditSpaceModal
                                            triggerElement={open => (
                                                <Button
                                                    onClick={open}
                                                    variant="ghost"
                                                    size="small"
                                                    className={getBemClasses(styles, 'settingsActionButton')}
                                                >
                                                    Управление пространством
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
                                    : null
                            }
                        />))
                }
            </div>
        </PageComponent>
    );
});
