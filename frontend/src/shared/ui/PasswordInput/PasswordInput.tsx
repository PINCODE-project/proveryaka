import { FC, useState } from 'react';

import Eye from '@shared/assets/icons/Eye.svg';
import EyeSlash from '@shared/assets/icons/EyeSlash.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, Input, InputProps } from '@shared/ui';

import styles from './PasswordInput.module.css';

export type Props = ClassNameProps & TestProps & InputProps;

export const PasswordInput: FC<Props> = typedMemo(function PasswordInput({
    className,
    'data-testid': dataTestId = 'PasswordInput',
    ...inputProps
}) {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Input
                {...inputProps}
                type={isHidden ? 'password' : 'text'}
                className={getBemClasses(styles, 'input', null, className)}
            />
            <Button
                variant="ghost"
                isIconButton
                size="small"
                className={getBemClasses(styles, 'hiddenButton')}
                onClick={() => setIsHidden(isHidden => !isHidden)}
            >
                {isHidden
                    ? <Eye className={getBemClasses(styles, 'buttonIcon')} />
                    : <EyeSlash className={getBemClasses(styles, 'buttonIcon')} />}
            </Button>
        </div>
    );
});
