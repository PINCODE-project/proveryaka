import { AvailableSelectItemValueTypes } from '@shared/ui/Select/AvailableSelectItemValueTypes';

import { SelectItem } from './SelectItem';

function pushNodeAndChildrenToArray<TOption extends AvailableSelectItemValueTypes>(tree: SelectItem<TOption>, array: SelectItem<TOption>[]) {
    array.push(tree);
    if (tree.children != null) {
        tree.children.forEach(x => pushNodeAndChildrenToArray(x, array));
    }
    return array;
}

/**
 * Метод преобразования массива опций в плоский список
 * @param tree
 */
export function getFlatOptionList<TOption extends AvailableSelectItemValueTypes>(tree: SelectItem<TOption>[]): SelectItem<TOption>[] {
    const array: SelectItem<TOption>[] = [];
    tree.forEach(x => array.concat(pushNodeAndChildrenToArray(x, array)));
    return array;
}
