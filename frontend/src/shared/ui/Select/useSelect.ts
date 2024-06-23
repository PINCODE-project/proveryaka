import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounceState } from '@shared/hooks';

import { AvailableSelectItemValueTypes } from './AvailableSelectItemValueTypes';
import { getFlatOptionList } from './getFlatOptionList';
import { SelectItem } from './SelectItem';

type SearchParameters = Readonly<{
    /**
     * Обработчик обновления текста поиска
     */
    onChangeSearch?: () => void | Promise<void>;

    /**
     * Первоначальное значение поиска
     */
    initialSearch?: string;

    /**
     * Время задержки обработки поиска в миллисекундах
     * @default 100ms
     */
    debounceTimer?: number;
}>;

export type Parameters<TValue extends AvailableSelectItemValueTypes> = Readonly<{
    /**
     * Изначально установленные значения
     */
    initialSelectedItems?: SelectItem<TValue>[];

    /**
     * Доступен ли выбор нескольких значений
     */
    isMultiselect?: boolean;

    /**
     * Включен ли поиск
     * @default false
     */
    withSearch?: boolean;

    /**
     * Параметры поиска
     */
    search?: SearchParameters;

    /**
     * Перезапись обработчика фильтрации значений (отфильтрованные попадают в hidden)
     */
    onFilterOptions?: (option: SelectItem<TValue>, search: string) => boolean;
}>;

/**
 * Предоставляет стандартные утилиты для селекта
 * @param items список доступных к выбору элементов
 * @param parameters настройки
 */
export function useSelect<TValue extends AvailableSelectItemValueTypes>(
    items: SelectItem<TValue>[],
    parameters?: Parameters<TValue>,
) {
    const [
        visibleItems,
        setVisibleItems,
    ] = useState<SelectItem<TValue>[]>([]);
    const [
        visibleValues,
        setVisibleValues,
    ] = useState<TValue[]>([]);
    const [
        selectedItems,
        setSelectedItems,
    ] = useState<SelectItem<TValue>[]>(parameters?.initialSelectedItems ?? []);
    const updateSelectedItems = useCallback(
        (items: SelectItem<TValue>[]) => {
            if (parameters?.isMultiselect === true) {
                setSelectedItems(items.length > 0 ? [items[0]] : []);
            } else {
                setSelectedItems(items);
            }
        },
        [parameters?.isMultiselect],
    );

    const [search, setSearch] = useState(parameters?.search?.initialSearch ?? '');
    const debouncedSearch = useDebounceState(
        search,
        parameters?.search?.debounceTimer ?? 100,
    );

    const getItemsByValues = useCallback(
        (values: TValue[]) => items.filter(x => values.includes(x.value)),
        [items],
    );

    const isValueHidden = useCallback((value: TValue) => !visibleValues.includes(value), [visibleValues]);

    useEffect(() => {
        let newVisibleItems = items;
        const parsedSearch = debouncedSearch.toLowerCase().trim();
        if (parameters?.onFilterOptions || (parameters?.withSearch && parsedSearch.length > 0)) {
            newVisibleItems = getFlatOptionList(newVisibleItems).filter(
                x => {
                    if (parameters?.onFilterOptions) {
                        return parameters.onFilterOptions(x, search);
                    }

                    if (parameters?.withSearch && parsedSearch.length > 0) {
                        const isValid = typeof x.label === 'string' && x.label.toLowerCase().includes(parsedSearch);
                        if (!isValid) {
                            return false;
                        }
                    }

                    // Другие фильтры...

                    return true;
                },
            ).map(item => ({ value: item.value, label: item.label }));
        }

        setVisibleValues(newVisibleItems.map(x => x.value));
        setVisibleItems(newVisibleItems);
    }, [debouncedSearch, items, parameters?.withSearch, parameters?.onFilterOptions]);

    return useMemo(() => ({
        search,
        setSearch,
        visibleItems,
        selectedItems,
        setSelectedItems: updateSelectedItems,
        getItemsByValues,
        isValueHidden,
    }), [
        search,
        visibleItems,
        selectedItems,
        updateSelectedItems,
        getItemsByValues,
        isValueHidden,
    ]);
}
