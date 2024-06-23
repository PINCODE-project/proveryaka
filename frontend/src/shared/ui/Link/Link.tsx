import { FC, useMemo } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';

import styles from './Link.module.css';

export type Props = TestProps & ClassNameProps & LinkProps & Readonly<{
    isActive?: boolean;
}>;

export const Link: FC<Props> = typedMemo(({
    className,
    isActive,
    'data-testid': dataTestId = 'Link',
    ...linkProps
}: Props) => {
    const mods = useMemo(() => ({ isActive }), [isActive]);

    return (
        <RouterLink
            data-testid={dataTestId}
            className={getBemClasses(styles, null, mods, className)}
            {...linkProps}
        />
    );
});
