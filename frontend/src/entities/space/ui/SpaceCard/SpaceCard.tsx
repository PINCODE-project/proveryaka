import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import ThreeDots from '@shared/assets/icons/ThreeDots.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { DropDown, FlexContainer, Image, Text } from '@shared/ui';

import styles from './SpaceCard.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{
    space: any;
    actions?: ReactNode;
}>;

export const SpaceCard: FC<Props> = typedMemo(({
    space,
    actions,
    className,
    'data-testid': dataTestId = 'SpaceCard',
}: Props) => {
    return (
        <Link to={SpaceRouter.Tasks(0)}>
            <FlexContainer
                direction="column"
                overflow="nowrap"
                gap="l"
                data-testid={dataTestId}
                className={getBemClasses(styles, null, null, className)}
            >
                <Image
                    alt="space avatar"
                    placeholderSrc={'https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled'}
                    className={getBemClasses(styles, 'avatar')}
                />

                <FlexContainer
                    direction="row"
                    gap="m"
                    overflow="nowrap"
                    alignItems="start"
                    justifyContent="space-between"
                    className={getBemClasses(styles, 'info')}
                >
                    <Text className={getBemClasses(styles, 'name')}>
                        Name
                    </Text>

                    <DropDown
                        renderLabel={
                            <FlexContainer
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                className={getBemClasses(styles, 'settings')}
                            >
                                <ThreeDots className={getBemClasses(styles, 'settingsIcon')} />
                            </FlexContainer>
                        }
                        contentClassName={getBemClasses(styles, 'settingsModal')}
                    >
                        {actions}
                    </DropDown>
                </FlexContainer>
            </FlexContainer>
        </Link>
    );
});
