import { ReactNode } from 'react';

type AvailableSelectItemValueTypes = string | number | null | object;

/**
 * Опция селекта
 */
export type SelectItem<TValue extends AvailableSelectItemValueTypes> = {
    /**
     * Отображаемое название
     */
    label: string | ReactNode;

    /**
     * Значение
     */
    value: TValue;

    /**
     * Вложенные опции
     */
    children?: SelectItem<TValue>[];
};
