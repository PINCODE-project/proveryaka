import { cloneElement, ReactElement, useCallback, useId, useMemo } from 'react';
import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';

import { getBemClasses, typedMemo } from '@shared/lib';

import styles from './Tooltip.module.css';
import { changeTooltipMaxHeight } from './utils';

export type Props = Omit<ITooltip, 'children'> & Readonly<{
    /**
     * Элемент, над которым будет подсказка
     */
    children: ReactElement;
}>;

/**
 * Подсказка
 * Warning: перезаписывает id элемента, на который вешается подсказка
 */
export const Tooltip = typedMemo(function Tooltip({
    children,
    className,
    ...props
}: Props) {
    const id = useId();
    const anchorId = useMemo(() => `${id.replace(/:/g, '')}-anchor`, [id]);
    const tooltipId = useMemo(() => `${id.replace(/:/g, '')}-tooltip`, [id]);

    const afterShow = useCallback(() => {
        changeTooltipMaxHeight(tooltipId, anchorId);
    }, [tooltipId, anchorId]);

    const anchorElement = useMemo(() => cloneElement(children, { id: anchorId }), [anchorId, children]);
    return (
        <>
            {anchorElement}
            <ReactTooltip
                {...props}
                anchorSelect={`#${anchorId}`}
                id={tooltipId}
                afterShow={afterShow}
                className={getBemClasses(styles, null, null, className)}
            />
        </>
    );
});
