import { getBemClasses } from '@shared/lib';

import styles from './Option.module.css';

type Props = {
    disabled?: boolean;
    withTreePadding?: boolean;
    selected?: boolean;
    isMultiSelect?: boolean;
    subElementName?: 'spoilerSummary' | 'spoiler' | 'spoilerContent';
};

/**
 * Возвращает стили Option, для похожего отображения
 * @param disabled выключена ли данная опция
 * @param withTreePadding нужен ли дополнительный отступ (при древовидном селекте)
 * @param selected выбрана ли данная опция
 * @param isMultiSelect можно ли выбрать несколько значений в селекте
 * @param subElementName подэлемент Option
 */
export function getOptionStyleClasses({
    disabled,
    withTreePadding,
    selected,
    isMultiSelect,
    subElementName,
}: Props) {
    return getBemClasses(styles, subElementName, {
        disabled,
        withTreePadding,
        selected,
        isMultiSelect,
    });
}
