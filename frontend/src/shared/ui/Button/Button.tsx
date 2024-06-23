import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactElement, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';
import { Loader } from '@shared/ui/Loader';

import styles from './Button.module.css';

export type Props = TestProps
    & ClassNameProps
    & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & Readonly<{
    /**
     * Находится ли кнопка в состоянии загрузки
     */
    isLoading?: boolean;

    /**
     * Контент кнопки при загрузке
     */
    loader?: string;

    /**
     * Вариант вида кнопки
     * @default 'accent'
     */
    variant?: 'neutral' | 'accent' | 'outline' | 'ghost';

    /**
     * Размер кнопки
     * @default 'medium'
     */
    size?: 'medium' | 'small';

    /**
     * Кнопка только с иконкой
     */
    isIconButton?: boolean;
}>;
/**
 * Кнопка.
 */
export const Button = typedMemo(forwardRef<HTMLButtonElement, Props>(function Button({
    variant = 'accent',
    type = 'button',
    size = 'medium',
    isIconButton,
    disabled,
    isLoading,
    ...props
}: Props, ref) {
    const { t } = useTranslation([Namespace.Common.ns]);

    const ContentComponent = useMemo((): ReactNode => {
        if (isIconButton) {
            return isLoading ? <Loader variant={'circle'} size={18} /> : props.children;
        }
        return isLoading
            ? <FlexContainer
                direction="row"
                alignItems="center"
                gap="xs"
                overflow="nowrap"
            >
                <Loader variant={'circle'} size={14} className={getBemClasses(styles, 'loader')} />
                {props.loader ?? `${t('loading', Namespace.Common)}...`}
            </FlexContainer>
            : props.children;
    }, [isIconButton, isLoading, props, t]);

    return (
        <button
            {...props}
            type={type}
            ref={ref}
            className={
                getBemClasses(
                    styles,
                    null,
                    { disabled, variant, isIconButton, size, isLoading },
                    props.className,
                )
            }
            disabled={disabled}
        >
            {ContentComponent}
        </button>
    );
}));
