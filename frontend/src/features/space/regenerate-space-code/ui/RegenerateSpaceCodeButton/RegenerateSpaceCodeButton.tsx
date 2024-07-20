import { FC } from 'react';
import { useQueryClient } from 'react-query';

import { useRegenerateSpaceCode } from '@features/space/regenerate-space-code/lib/useRegenerateSpaceCode';

import { getSpacesQueryKey } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button } from '@shared/ui';

import styles from './RegenerateSpaceCodeButton.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
}>;

export const RegenerateSpaceCodeButton: FC<Props> = typedMemo(function RegenerateSpaceCodeButton({
    className,
    spaceId,
    'data-testid': dataTestId = 'RegenerateSpaceCodeButton',
}) {
    const queryClient = useQueryClient();
    const { mutate: regenerate } = useRegenerateSpaceCode({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            queryClient.resetQueries(getSpaceQueryKey(spaceId));
        },
    });

    return (
        <Button
            onClick={() => regenerate(spaceId)}
            variant="ghost"
            size="small"
            className={getBemClasses(styles, null, null, className)}
        >
            Перегенерировать код
        </Button>
    );
});
