import { ReactNode } from 'react';

import { AvailableSelectItemValueTypes } from './AvailableSelectItemValueTypes';

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
