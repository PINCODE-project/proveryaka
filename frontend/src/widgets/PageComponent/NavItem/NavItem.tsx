import { type FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './NavItem.module.css';

export type Props = TestProps & ClassNameProps & Readonly<{
    to: string;
    icon: ReactNode;
    name: string;
}>;

export const NavItem: FC<Props> = typedMemo(({
    to,
    icon,
    name,
    className,
    'data-testid': dataTestId = 'NavItem',
}: Props) => {
    const { t } = useTranslation();

    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <FlexContainer
                    direction="column"
                    alignItems="center"
                    data-testid={dataTestId}
                    className={getBemClasses(styles, null, { isActive }, className)}
                >
                    {icon}
                    <Text className={getBemClasses(styles, 'name')}>{name}</Text>
                </FlexContainer>
            )}
        </NavLink>

    );
});
