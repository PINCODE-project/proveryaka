import { type FC, useCallback, useState } from 'react';

import { PageComponent } from '@widgets/PageComponent';

import { GetSpaceFilters, SpaceCard, useGetSpaces } from '@entities/space';

import PeopleAdd from '@shared/assets/icons/PeopleAdd.svg';
import Settings from '@shared/assets/icons/Settings.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './SpacesPage.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{}>;

export const SpacesPage: FC<Props> = typedMemo(({
    className,
    'data-testid': dataTestId = 'SpacesPage',
}: Props) => {
    const [filters, setFilters] = useState<GetSpaceFilters>({
        page: 0,
        count: 15,
    });
    const changeFilters = useCallback((key: keyof GetSpaceFilters, name: GetSpaceFilters[keyof GetSpaceFilters]) => {
        setFilters(filters => ({ ...filters, [key]: name }));
    }, []);

    const { data, isLoading } = useGetSpaces(filters);
    console.log(data, isLoading);

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

                <Button
                    variant="outline"
                    className={getBemClasses(styles, 'addSpaceButton')}
                >
                    <PeopleAdd className={getBemClasses(styles, 'addSpaceButtonIcon')} />
                    Присоединиться или создать команду
                </Button>
            </FlexContainer>

            <div className={getBemClasses(styles, 'spaces')}>
                {
                    data!.entityList!.map(space => (
                        <SpaceCard
                            space={space}
                            key={space.id}
                            actions={
                                <Button variant="ghost" size="small" className={getBemClasses(styles, 'settingsActionButton')}>
                                    <Settings className={getBemClasses(styles, 'settingsActionButtonIcon')} />
                                    Управление командой
                                </Button>
                            }
                        />))
                }
            </div>
        </PageComponent>
    );
});
