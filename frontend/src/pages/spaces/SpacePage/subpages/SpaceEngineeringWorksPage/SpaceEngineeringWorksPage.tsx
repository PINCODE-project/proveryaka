import { Typography } from 'antd';
import { FC } from 'react';

import TechnicalSupport from '@shared/assets/images/technical-support.png';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './SpaceEngineeringWorksPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceEngineeringWorksPage: FC<Props> = typedMemo(function SpaceEngineeringWorksPage({
    className,
    'data-testid': dataTestId = 'SpaceEngineeringWorksPage',
}) {
    return (
        <FlexContainer
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="column"
                alignItems="center"
            >
                <img src={TechnicalSupport} className={getBemClasses(styles, 'img')} />
                <Typography className={getBemClasses(styles, 'title')}>
                    Ведутся технические работы
                </Typography>
                <Typography className={getBemClasses(styles, 'desc')}>
                    Ваши отчёты распределяются на проверку
                    <br />
                    В течение 1-2 часов всё станет доступно
                </Typography>
            </FlexContainer>
        </FlexContainer>
    );
});
