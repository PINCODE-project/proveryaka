import { createElement, CSSProperties, FC, forwardRef, PropsWithChildren } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './FlexContainer.module.css';

export type Props = PropsWithChildren &
    ClassNameProps &
    TestProps &
    Readonly<{
        /**
         * Направление массива элементов
         * @default row
         */
        direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';

        /**
         * Промежуток между элементами
         */
        gap?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

        /**
         * Расположение элементов
         * @default "start"
         */
        justifyContent?:
            | 'start'
            | 'end'
            | 'center'
            | 'space-between'
            | 'space-around'
            | 'space-evenly';

        /**
         * Расположение элементов
         * @default "start"
         */
        alignItems?: 'start' | 'end' | 'center' | 'stretch';

        /**
         * Растягивает/сужает элементы, чтобы они имели одинаковый размер
         * @default false
         */
        enableResize?: boolean;

        /**
         * Ширина компонента
         * @default "auto"
         */
        width?: 'fit-content' | 'fit-parent' | 'auto';

        /**
         * Высота компонента
         * @default "auto"
         */
        height?: 'fit-content' | 'fit-parent' | 'auto';

        /**
         * При переполнении
         * @default 'wrap'
         */
        overflow?: 'wrap' | 'wrap-reverse' | 'nowrap' | 'scroll' | 'hidden';

        /**
         * Разделитель после каждого элемента, за исключением последнего
         * @default false
         */
        withSplitter?: boolean;

        /**
         * HTML тэг, который будет использован в качестве контейнера
         */
        tag?: 'div' | 'header' | 'section' | 'nav' | 'aside' | 'article';

        /**
         * Стили
         */
        style?: CSSProperties;
    }>;

export const FlexContainer: FC<Props> = typedMemo(forwardRef(function FlexContainer({
    direction = 'row',
    gap,
    justifyContent = 'start',
    alignItems = 'start',
    enableResize = false,
    width = 'auto',
    height = 'auto',
    overflow = 'wrap',
    withSplitter = false,
    tag = 'div',
    children,
    className,
    style,
    'data-testid': dataTestId = 'FlexContainer',
}: Props, ref) {
    return createElement(
        tag,
        {
            ref,
            className: getBemClasses(
                styles,
                null,
                {
                    direction,
                    gap,
                    justifyContent,
                    alignItems,
                    enableResize,
                    width,
                    height,
                    overflow,
                    withSplitter,
                },
                className,
            ),
            'data-testid': dataTestId,
            style,
        },
        children,
    );
}));
