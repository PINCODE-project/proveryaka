import { PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Namespace } from '@shared/config/i18n';
import { getBemClasses, mixClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { DropDown, getFlexContainerStyleClasses, SelectEmpty, Text } from '@shared/ui';

import { AvailableSelectItemValueTypes } from './AvailableSelectItemValueTypes';
import { Label } from './Label/Label';
import styles from './Select.module.css';
import { SelectContextProvider } from './SelectContext';
import { SelectItem } from './SelectItem';

export type Props<TValue extends AvailableSelectItemValueTypes> =
    PropsWithChildren & ClassNameProps & TestProps & Readonly<{
    /**
     * Список элементов, недоступных для выбора
     */
    disabledValues?: TValue[];

    /**
     * Список выбранных элементов
     */
    selectedValues?: SelectItem<TValue>[];

    /**
     * Доступен ли выбор нескольких элементов
     * @default false
     */
    isMultiSelect?: boolean;

    /**
     * Является ли селект древовидным
     * @default false
     */
    isTreeSelect?: boolean;

    /**
     * Является ли список элементов пустым
     */
    isEmpty?: boolean;

    /**
     * Видно ли выбранные элемент
     * @default true
     */
    isSelectedVisible?: boolean;

    /**
     * Новый список выбранных элементов
     * @param values список выбранных элементов
     */
    onSelect: (values: SelectItem<TValue>[]) => void | Promise<void>;

    /**
     * Ширина компонента
     * @default fit-content
     */
    width?: 'fit-content' | 'fit-parent';

    /**
     * Текст, отображаемый при отсутствии выбора
     * @default t('core_not_selected')
     */
    notSelectedLabel?: string;

    /**
     * Заблокирован ли выбор
     */
    disabled?: boolean;

    /**
     * Невалидно заполненное поле
     */
    invalid?: boolean;
}>;

/**
 * Список скрытых под названием элементов с возможностью выбора
 */
export const Select = typedMemo(function Select<TValue extends AvailableSelectItemValueTypes, >({
    disabledValues,
    selectedValues: selectedValuesProp,
    isMultiSelect = false,
    isTreeSelect = false,
    isSelectedVisible = true,
    isEmpty = false,
    onSelect,
    width = 'fit-content',
    notSelectedLabel,
    children,
    disabled,
    invalid,
    className,
    'data-testid': dataTestId = 'Select',
}: Props<TValue>) {
    const { t } = useTranslation([Namespace.Common.ns]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedValues, setSelectedValues] = useState(selectedValuesProp ?? []);

    useEffect(() => {
        if (selectedValuesProp == null) {
            return;
        }
        setSelectedValues(selectedValuesProp);
    }, [selectedValuesProp]);

    const onSelectWrapper = useCallback(async (values: SelectItem<TValue>[]) => {
        if (!isMultiSelect) {
            setIsExpanded(false);
        }
        setSelectedValues(values);
        await onSelect?.(values);
    }, [isMultiSelect, onSelect]);

    const label = useMemo(() => {
        let isChosen = false;
        if (selectedValues.length > 0) {
            isChosen = true;
        }

        let text: ReactNode;
        if (isChosen) {
            if (isMultiSelect) {
                return (
                    <Text className={getBemClasses(styles, 'labelTextCount', { isChosen, isMultiSelect })}>
                        {`${t('core_selected')}: ${selectedValues.length}`}
                    </Text>
                );
            } else {
                text = selectedValues[0].label;
            }
        } else {
            if (isEmpty) {
                text = t('not_data', Namespace.Common);
            } else {
                text = notSelectedLabel ?? t('select', Namespace.Common);
            }
        }

        return (
            <Text className={getBemClasses(styles, 'labelText', { isChosen, isMultiSelect })}>
                {text}
            </Text>
        );
    }, [isEmpty, isMultiSelect, selectedValues, t, notSelectedLabel]);

    return (
        <SelectContextProvider<TValue>
            disabledValues={disabledValues}
            selectedValues={selectedValues}
            isMultiSelect={isMultiSelect}
            isTreeSelect={isTreeSelect}
            isSelectedVisible={isSelectedVisible}
            onSelect={onSelectWrapper}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
        >
            <DropDown
                disabled={isEmpty || disabled}
                renderLabel={isExpanded => (
                    <Label
                        disabled={disabled}
                        isExpanded={isExpanded}
                        data-testid={`${dataTestId}.label`}
                        className={getBemClasses(styles, 'label')}
                    >
                        {label}
                    </Label>
                )}
                className={
                    getBemClasses(
                        styles,
                        null,
                        { isExpanded, disabled: isEmpty || disabled, width, invalid },
                        className,
                    )
                }
                contentClassName={
                    mixClasses(
                        getFlexContainerStyleClasses({
                            direction: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            height: 'fit-content',
                            overflow: 'scroll',
                            enableResize: false,
                        }),
                        getBemClasses(
                            styles,
                            'contentContainer',
                            null,
                        ),
                    )
                }
                data-testid={dataTestId}
                isExpanded={isExpanded}
                onChangeExpand={setIsExpanded}
            >
                {isEmpty ? <SelectEmpty /> : children}
            </DropDown>
        </SelectContextProvider>
    );
});
