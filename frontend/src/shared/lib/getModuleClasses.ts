import { mixClasses } from './mixClasses';
import { BemModificator, CssModule } from '../types';

export function getModuleClasses(
    cssModule: CssModule,
    elementName: string,
    modificator?: BemModificator | null,
    ...extraClasses: Array<string | undefined | null>
): string {
    if (Object.keys(cssModule).length === 0) {
        return mixClasses(
            ...extraClasses,
        );
    }

    const classes = [];

    classes.push(cssModule[elementName]);

    if (modificator) {
        Object.entries(modificator).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                if (value) {
                    classes.push(cssModule[key]);
                }
                return;
            }
            classes.push(cssModule[`${key}_${value}`]);
        });
    }

    return mixClasses(
        ...classes,
        ...extraClasses,
    );
}
