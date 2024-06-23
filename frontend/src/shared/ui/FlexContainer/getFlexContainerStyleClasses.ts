import { getBemClasses } from '@shared/lib';

import { Props } from './FlexContainer';
import styles from './FlexContainer.module.css';

/**
 * Метод для получения классов FlexContainer
 * @param params параметры стилей
 */
export function getFlexContainerStyleClasses(
    params: Pick<
        Props,
        | 'direction'
        | 'gap'
        | 'justifyContent'
        | 'alignItems'
        | 'enableResize'
        | 'width'
        | 'height'
        | 'overflow'
        | 'withSplitter'
    >,
): string {
    return getBemClasses(styles, null, params);
}
