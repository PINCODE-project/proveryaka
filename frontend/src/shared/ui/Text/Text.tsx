import { createElement, FC, MouseEventHandler, PropsWithChildren } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps, ClassNameProps } from '@shared/types';

import styles from './Text.module.css';

export type Props = PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * HTML тег, который вернется
     * @default 'p'
     */
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'label';

    /**
     * Выключить ли перенос строк
     * @default false
     */
    nowrap?: boolean;

    /**
     * Метод клика на текст
     */
    onClick?: MouseEventHandler<HTMLElement>;

    /**
     * Текст не выделяемый
     */
    noselect?: boolean;
}>;

/**
 * Любой текст на странице
 */
export const Text: FC<Props> = typedMemo(function Text({
    tag = 'p',
    noselect,
    nowrap = false,
    children,
    className,
    'data-testid': dataTestId = 'Text',
    ...props
}: Props) {
    return createElement(
        tag,
        {
            className: getBemClasses(styles, null, { nowrap, noselect }, className),
            'data-testid': dataTestId,
            ...props,
        },
        children);
});
