/**
 * Базовый ответ на запрос массива сущностей
 */
export type GetListResponse<TItem> = {
    entityList: TItem[] | null;
};
