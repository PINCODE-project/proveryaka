import { useCallback, useMemo } from 'react';

import Cross from '@shared/assets/icons/Cross.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Text } from '@shared/ui';

import styles from './SelectedItemBadge.module.css';
import { AvailableSelectItemValueTypes } from '../AvailableSelectItemValueTypes';
import { useSelectContext } from '../SelectContext';
import { SelectItem } from '../SelectItem';

export type Props<TValue extends AvailableSelectItemValueTypes> = ClassNameProps & TestProps & Readonly<{
    /**
     * Данные элемента
     */
    item: SelectItem<TValue>;

    /**
     * Действие при нажатии на кнопку
     * @param item данные элемента
     */
    onClick?: (item: SelectItem<TValue>) => void | Promise<void>;
}>;

/**
 * Карточка выбранного элемента
 */
export const SelectedItemBadge = typedMemo(function SelectedItem<TValue extends AvailableSelectItemValueTypes, >({
    item,
    onClick,
    className,
    'data-testid': dataTestId = 'SelectedItem',
}: Props<TValue>) {
    const {
        disabledValues,
        hiddenValues,
        onSelectItem,
    } = useSelectContext<TValue>();
    const onClickHandler = useCallback(async () => {
        await onSelectItem(item);
        await onClick?.(item);
    }, [item, onClick, onSelectItem]);

    const disabled = useMemo(
        () => disabledValues?.includes(item.value) ?? false,
        [disabledValues, item.value],
    );

    if (hiddenValues?.includes(item.value)) {
        return null;
    }

    return (
        <FlexContainer
            direction="row"
            overflow="nowrap"
            alignItems="center"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Text className={getBemClasses(styles, 'text')}>{item.label}</Text>

            {!disabled &&
                <Button
                    variant="outline"
                    color="default"
                    key={`${item.value}.removeButton`}
                    onClick={onClickHandler}
                    className={getBemClasses(styles, 'removeButton')}
                    data-testid={`${dataTestId}.button`}
                >
                    <Cross className={getBemClasses(styles, 'removeButtonIcon')} />
                </Button>
            }
        </FlexContainer>
    );
});
