import { ReactNode } from 'react';

import { AvailableSelectItemValueTypes, Option, SelectItem } from '@shared/ui';

/**
 * Метод рендера вложенных опций
 * @param item
 */
export function renderOption<TValue extends AvailableSelectItemValueTypes>(item: SelectItem<TValue>): ReactNode {
    return (
        <Option value={item.value} label={item.label} key={String(item.value)}>
            {item.children && item.children.length > 0 ? item.children.map(renderOption) : null}
        </Option>
    );
}
