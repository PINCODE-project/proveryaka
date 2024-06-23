import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { PageComponent } from '@widgets/PageComponent';

import { SpaceCard } from '@entities/space';

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
    const spaces = [0, 0, 0];

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
                    spaces.map(space => (
                        <SpaceCard
                            space={space}
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
