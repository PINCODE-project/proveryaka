import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './NavTab.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{
    to: string;
    name: string;
    end?: boolean;
}>;

export const NavTab: FC<Props> = typedMemo(({
    className,
    to,
    name,
    end = true,
    'data-testid': dataTestId = 'NavTab',
}: Props) => {
    return (
        <NavLink to={to} className={getBemClasses(styles, null, null, className)} end={end}>
            {({ isActive }) => (
                <FlexContainer
                    direction="column"
                    justifyContent="center"
                    data-testid={dataTestId}
                    className={getBemClasses(styles, 'container', { isActive })}
                >
                    <Text className={getBemClasses(styles, 'name')}>
                        {name}
                    </Text>
                </FlexContainer>
            )}
        </NavLink>
    );
});
