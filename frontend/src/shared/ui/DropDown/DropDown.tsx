import {
    FC,
    PropsWithChildren,
    ReactNode,
    SyntheticEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './DropDown.module.css';

export type Props = PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * Раскрыт ли элемент
     */
    isExpanded?: boolean;

    /**
     * Обработчик раскрытия/закрытия элемента
     * @param isOpen новое состояние
     */
    onChangeExpand?: (isOpen: boolean) => void | Promise<void>;

    /**
     * Надпись элемента
     */
    renderLabel: ReactNode | ((isExpanded: boolean) => ReactNode);

    /**
     * Классы для контейнера контента
     */
    contentClassName?: string;

    /**
     * Классы для контейнера надписи
     */
    summaryClassName?: string;

    /**
     * Отключена ли возможность раскрыть
     */
    disabled?: boolean;

    renderChildren?: (close: () => void) => ReactNode;
}>;

/**
 * Контент, отображаемый в отдельном окошке при нажатии на название
 */
export const DropDown: FC<Props> = typedMemo(function DropDown({
    isExpanded: isExpandedProp = false,
    onChangeExpand,
    renderLabel,
    renderChildren,
    contentClassName,
    summaryClassName,
    disabled = false,
    children,
    className,
    'data-testid': dataTestId = 'DropDown',
}: Props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const contentContainerRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLElement>(null);
    const [isExpanded, setIsExpanded] = useState(isExpandedProp);

    useEffect(() => {
        setIsExpanded(isExpandedProp);
    }, [isExpandedProp]);

    useEffect(() => {
        if (disabled) {
            setIsExpanded(false);
        }
    }, [disabled]);

    const toggleHandler = useCallback(
        async (event: SyntheticEvent<HTMLDetailsElement>) => {
            if (disabled) {
                setIsExpanded(false);
                return;
            }

            const isOpen = event.currentTarget.open;
            await onChangeExpand?.(isOpen);
            setIsExpanded(isOpen);
        },
        [disabled, onChangeExpand],
    );

    const onMouseClickHandler = useCallback(
        async (event: MouseEvent) => {
            if (contentContainerRef.current?.contains(event.target as (Node | null))) {
                return;
            }
            if (summaryRef.current?.contains(event.target as (Node | null))) {
                return;
            }
            await onChangeExpand?.(false);
            setIsExpanded(false);
        },
        [onChangeExpand],
    );

    const updateFlipped = useCallback(() => {
        if (contentContainerRef.current == null) {
            return;
        }

        const containerHeight = contentContainerRef.current.getBoundingClientRect().height;
        const containerParentBottom = contentContainerRef.current.parentElement?.getBoundingClientRect().bottom ?? 0;

        setIsFlipped(containerHeight + containerParentBottom > window.innerHeight);
    }, []);

    const onClick = useCallback((event: React.MouseEvent) => {
        if (!disabled) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
    }, [disabled]);

    useLayoutEffect(() => {
        if (!isExpanded) {
            return;
        }

        updateFlipped();
    }, [isExpanded, updateFlipped]);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseClickHandler);
        return () => {
            document.removeEventListener('mousedown', onMouseClickHandler);
        };
    }, [onMouseClickHandler]);

    const close = useCallback(() => {
        setIsExpanded(false);
    }, []);

    return (
        <details
            className={getBemClasses(styles, null, { disabled }, className)}
            open={isExpanded}
            onToggle={toggleHandler}
            onClick={onClick}
            data-testid={dataTestId}
        >
            <summary
                className={
                    getBemClasses(
                        styles,
                        'summary',
                        { disabled },
                        summaryClassName,
                    )
                }
                data-testid={`${dataTestId}.summary`}
                ref={summaryRef}
            >
                {typeof renderLabel === 'function' ? renderLabel(isExpanded) : renderLabel}
            </summary>

            <div
                onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
                className={
                    getBemClasses(
                        styles,
                        'contentContainer',
                        { isExpanded, isFlipped },
                        contentClassName,
                    )
                }
                ref={contentContainerRef}
            >
                {renderChildren?.(close) ?? children}
            </div>
        </details>
    );
});
