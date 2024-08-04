import { FC, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { getFile } from '@shared/api';
import ThreeDots from '@shared/assets/icons/ThreeDots.svg';
import { useFileUrlById } from '@shared/hooks';
import { getBemClasses, getFileUrl, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { DropDown, FlexContainer, Image, Text } from '@shared/ui';

import styles from './SpaceCard.module.css';
import { GetSpaceResponse } from '../../model/GetSpaceResponse';

export type Props = TestProps & ClassNameProps & Readonly<{
    space: GetSpaceResponse;
    actions?: ReactNode;
    showActions?: boolean;
}>;

export const SpaceCard: FC<Props> = typedMemo(({
    space,
    actions,
    showActions,
    className,
    'data-testid': dataTestId = 'SpaceCard',
}: Props) => {
    const [iconUrl] = useFileUrlById(space.icon);

    return (
        <Link to={SpaceRouter.Tasks(space.id)}>
            <FlexContainer
                direction="column"
                overflow="nowrap"
                gap="l"
                data-testid={dataTestId}
                className={getBemClasses(styles, null, null, className)}
            >
                <FlexContainer direction="column" alignItems="center" justifyContent="center"
                    className={getBemClasses(styles, 'avatar')}
                >
                    {space.name?.[0]}
                </FlexContainer>
                {/* <Image
                    alt="space avatar"
                    src={iconUrl}
                    placeholderSrc={'https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled'}
                    className={getBemClasses(styles, 'avatar')}
                /> */}

                <FlexContainer
                    direction="row"
                    gap="m"
                    overflow="nowrap"
                    alignItems="start"
                    justifyContent="space-between"
                    className={getBemClasses(styles, 'info')}
                >
                    <Text className={getBemClasses(styles, 'name')}>
                        {space.name}
                    </Text>

                    {showActions
                        ? <DropDown
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
                        : null}
                </FlexContainer>
            </FlexContainer>
        </Link>
    );
});
