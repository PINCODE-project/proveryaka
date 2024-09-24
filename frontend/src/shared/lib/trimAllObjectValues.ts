/**
 * Применяет trim ко всем полям объекта
 * @param object объект для изменения
 */
export const trimAllObjectValues = (object: object) => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) =>
            [key, typeof value === 'string' ? value!.trim() : value],
        ),
    );
};
