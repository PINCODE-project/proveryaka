import { CSSProperties, MouseEvent, PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';
import { Checkbox } from '@shared/ui/Checkbox';
import { AvailableSelectItemValueTypes, SelectItem } from '@shared/ui/Select';
import { Spoiler } from '@shared/ui/Spoiler';

import styles from './Option.module.css';
import { SelectContextProps, useSelectContext } from '../SelectContext';

export type Props<TValue extends AvailableSelectItemValueTypes> =
    PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * Значение, которое будет передано (при undefined не будет попадать в onSelect)
     */
    value?: SelectItem<TValue>['value'];

    /**
     * Перезаписанное поведение Option
     * @param context контекст селекта
     */
    onClick?: (context: SelectContextProps<TValue>) => void | Promise<void>;

    /**
     * Подпись значения
     * @default value?.toString()
     */
    label?: ReactNode;

    /**
     * Стили на элементе
     */
    style?: CSSProperties;

    /**
     * Выбрана ли опция
     * Внимание: нужно только для декоративных опций
     */
    selected?: boolean;
}>;

/**
 * Элемент списка элементов для выбора
 */
export const Option = typedMemo(function Option<TValue extends AvailableSelectItemValueTypes, >({
    value,
    onClick,
    label = value?.toString(),
    children,
    style,
    selected: innerSelected,
    className,
    'data-testid': dataTestId = 'Option',
}: Props<TValue>) {
    const context = useSelectContext<TValue>();
    const {
        disabledValues,
        selectedValues,
        isMultiSelect,
        isTreeSelect,
        onSelectItem,
    } = context;

    const disabled = useMemo(
        () => value == null ? false : disabledValues != null && disabledValues.includes(value),
        [disabledValues, value],
    );
    const selected = useMemo(
        () => innerSelected || (value == null ? false : selectedValues.find(x => x.value === value) != null),
        [value, selectedValues, innerSelected],
    );

    const onSelect = useCallback(
        async (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (onClick != null) {
                await onClick(context);
                return;
            }

            if (value === undefined) {
                return;
            }

            await onSelectItem({
                value,
                label,
            });
        },
        [onClick, onSelectItem, value, label, context],
    );

    const option = useMemo(() => {
        return (
            <div
                key={`${value}.option`}
                className={getBemClasses(
                    styles,
                    null,
                    {
                        disabled,
                        withTreePadding: isTreeSelect && children == null,
                        selected,
                        isMultiSelect,
                    },
                    className,
                )}
                style={style}
                onClick={onSelect}
                data-testid={isMultiSelect ? null : dataTestId}
            >
                {
                    isMultiSelect
                        ? <Checkbox
                            key={`${value}.checkbox`}
                            checked={selected}
                            disabled={disabled}
                            label={label}
                            data-testid={dataTestId}
                        />
                        : label
                }
            </div>
        );
    }, [
        children, className, dataTestId,
        disabled, isMultiSelect, isTreeSelect,
        label, onSelect, selected, value, style,
    ]);

    if (children == null) {
        return option;
    }

    return (
        <Spoiler
            key={`${value}.Spoiler`}
            renderLabel={option}
            summaryClassName={getBemClasses(styles, 'spoilerSummary', { selected, isMultiSelect })}
            className={getBemClasses(styles, 'spoiler', null, className)}
        >
            <FlexContainer
                direction='column'
                justifyContent="center"
                alignItems="start"
                className={getBemClasses(styles, 'spoilerContent')}
            >
                {children}
            </FlexContainer>
        </Spoiler>
    );
});
