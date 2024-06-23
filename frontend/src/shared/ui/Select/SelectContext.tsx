import { createContext, PropsWithChildren, useCallback, useContext } from 'react';

import { typedMemo } from '@shared/lib';

import { AvailableSelectItemValueTypes } from './AvailableSelectItemValueTypes';
import { SelectItem } from './SelectItem';

export type SelectContextProps<TValue extends AvailableSelectItemValueTypes> = {
    /**
     * Список элементов, недоступных для выбора
     */
    disabledValues?: TValue[];

    /**
     * Список выбранных элементов
     */
    selectedValues: SelectItem<TValue>[];

    /**
     * Видно ли выбранные элементы
     */
    isSelectedVisible?: boolean;

    /**
     * Список скрытых элементов
     */
    hiddenValues?: TValue[];

    /**
     * Доступен ли выбор нескольких элементов
     * @default false
     */
    isMultiSelect?: boolean;

    /**
     * Является ли список элементов деревом
     */
    isTreeSelect?: boolean;

    /**
     * Метод для выбора элемента
     */
    onSelectItem: (value: SelectItem<TValue>) => void | Promise<void>;

    /**
     * Раскрыт ли селект
     */
    isExpanded: boolean;

    /**
     * Раскрыть/скрыть селект
     * @param value true - раскрыт, false - скрыт
     */
    setIsExpanded: (value: boolean) => void;
};

// eslint-disable-next-line
export const SelectContext = createContext<SelectContextProps<any> | null>(null);

export const useSelectContext = <TValue extends AvailableSelectItemValueTypes, >(): SelectContextProps<TValue> => {
    const context = useContext(SelectContext);

    if (context == null) {
        throw new Error('Used SelectContext without provider or before it');
    }

    return context;
};

export type SelectContextProviderProps<TValue extends AvailableSelectItemValueTypes> = PropsWithChildren & {
    /**
     * Список элементов, недоступных для выбора
     */
    disabledValues?: TValue[];

    /**
     * Список выбранных элементов
     */
    selectedValues: SelectItem<TValue>[];

    /**
     * Список скрытых элементов
     */
    hiddenValues?: TValue[];

    /**
     * Доступен ли выбор нескольких элементов
     * @default false
     */
    isMultiSelect?: boolean;

    /**
     * Является ли список элементов деревом
     */
    isTreeSelect?: boolean;

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
     * Раскрыт ли селект
     */
    isExpanded: boolean;

    /**
     * Раскрыть/скрыть селект
     * @param value true - раскрыт, false - скрыт
     */
    setIsExpanded: (value: boolean) => void;
};

export const SelectContextProvider = typedMemo(
    function SelectContextProvider<TValue extends AvailableSelectItemValueTypes, >({
        disabledValues,
        selectedValues,
        isMultiSelect,
        isTreeSelect,
        onSelect,
        isExpanded,
        isSelectedVisible,
        setIsExpanded,
        children,
    }: SelectContextProviderProps<TValue>) {
        const onSelectItem = useCallback((item: SelectItem<TValue>) => {
            const selectedValueIndex = selectedValues.findIndex(x => item.value === x.value);

            const newSelectedValues = isMultiSelect ? Array.from(selectedValues) : [item];
            if (isMultiSelect) {
                if (selectedValueIndex >= 0) {
                    newSelectedValues.splice(selectedValueIndex, 1);
                } else {
                    newSelectedValues.push(item);
                }
            }

            onSelect(newSelectedValues);
        }, [isMultiSelect, onSelect, selectedValues]);

        return (
            <SelectContext.Provider
                value={{
                    disabledValues,
                    selectedValues,
                    isMultiSelect,
                    isTreeSelect,
                    isSelectedVisible,
                    onSelectItem,
                    isExpanded,
                    setIsExpanded,
                }}
            >
                {children}
            </SelectContext.Provider>
        );
    },
);
