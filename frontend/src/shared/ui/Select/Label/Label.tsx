import { FC, PropsWithChildren, useMemo } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { ExpandIcon, FlexContainer } from '@shared/ui';
import { useSelectContext } from '@shared/ui/Select/SelectContext';
import { SelectedItemBadge } from '@shared/ui/Select/SelectedItemBadge/SelectedItemBadge';

import styles from './Label.module.css';

export type Props = PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * Раскрыт ли Select
     */
    isExpanded: boolean;

    /**
     * Заблокирован ли
     */
    disabled?: boolean;
}>;

/**
 * Надпись для Select
 */
export const Label: FC<Props> = typedMemo(function Label({
    isExpanded,
    children,
    disabled,
    className,
    'data-testid': dataTestId = 'Label',
}: Props) {
    const {
        selectedValues,
        isMultiSelect,
        isSelectedVisible,
    } = useSelectContext();

    const selectItemBadges = useMemo(
        () => (
            <FlexContainer
                direction="row"
                alignItems="start"
                gap="xs"
                className={getBemClasses(styles, 'badgesContainer')}
                justifyContent="start"
            >
                {selectedValues.map(item => (
                    <SelectedItemBadge
                        item={item}
                        key={`${item.label}.badge`}
                        data-testid={`${dataTestId}.${item.value}`}
                    />
                ))}
            </FlexContainer>
        ),
        [dataTestId, selectedValues],
    );

    return (
        <div
            className={getBemClasses(styles, null, { disabled }, className)}
            data-testid={dataTestId}
        >
            {children}

            <ExpandIcon
                isExpanded={isExpanded}
                closedDirection="down"
                expandedDirection="up"
                className={getBemClasses(styles, 'expandIcon')}
            />

            {isSelectedVisible && isMultiSelect && selectedValues.length > 0 ? selectItemBadges : null}
        </div>
    );
});
