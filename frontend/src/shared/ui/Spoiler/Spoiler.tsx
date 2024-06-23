import { FC, PropsWithChildren, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { ExpandIcon } from '@shared/ui';

import styles from './Spoiler.module.css';

export type Props = PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * Раскрыт/закрыт
     */
    isExpanded?: boolean;

    /**
     * Обработка смены состояния раскрыто/закрыто
     * @param isOpen новое состояние
     */
    onChangeExpand?: (isOpen: boolean) => void | Promise<void>;

    /**
     * Надпись элемента
     */
    renderLabel: ReactNode | ((isExpanded: boolean) => ReactNode);

    /**
     * Классы контейнера надписи
     */
    summaryClassName?: string;

    /**
     * Классы иконки состояния
     */
    expandIconClassName?: string;
}>;

/**
 * Скрытый, подписанный контент с возможностью раскрытия
 */
export const Spoiler: FC<Props> = typedMemo(function Spoiler({
    isExpanded: isExpandedProp = false,
    onChangeExpand,
    renderLabel,
    summaryClassName,
    expandIconClassName,
    children,
    className,
    'data-testid': dataTestId = 'Spoiler',
}: Props) {
    const [isExpanded, setIsExpanded] = useState(isExpandedProp);

    useEffect(() => {
        setIsExpanded(isExpandedProp);
    }, [isExpandedProp]);

    const toggleHandler = useCallback(
        async (event: SyntheticEvent<HTMLDetailsElement>) => {
            const isOpen = event.currentTarget.open;
            await onChangeExpand?.(isOpen);
            setIsExpanded(isOpen);
        },
        [onChangeExpand],
    );

    return (
        <details
            className={getBemClasses(styles, null, null, className)}
            open={isExpanded}
            onToggle={toggleHandler}
            data-testid={dataTestId}
        >
            <summary
                className={
                    getBemClasses(
                        styles,
                        'summary',
                        null,
                        summaryClassName,
                    )
                }
                data-testid={`${dataTestId}.summary`}
            >
                <ExpandIcon
                    isExpanded={isExpanded}
                    className={getBemClasses(styles, 'expandIcon', null, expandIconClassName)}
                    data-testid={`${dataTestId}.expandIcon`}
                />

                {typeof renderLabel === 'function' ? renderLabel(isExpanded) : renderLabel}
            </summary>

            {children}
        </details>
    );
});
