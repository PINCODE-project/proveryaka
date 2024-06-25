import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './NavTab.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    name: string;
    isActive: boolean;
    onClick: () => void;
}>;

export const NavTab: FC<Props> = typedMemo(function NavTab({
    isActive,
    onClick,
    name,
    className,
    'data-testid': dataTestId = 'NavTab',
}) {
    return (
        <div
            onClick={onClick}
            data-testid={dataTestId}
            className={getBemClasses(styles, null, { isActive }, className)}
        >
            <Text className={getBemClasses(styles, 'name')}>
                {name}
            </Text>
        </div>
    );
});
