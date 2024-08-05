import { ExampleType } from '@entities/example/common/model/ExampleType';

export type ExampleResponse = {
    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Описание эталона или антипримера
     */
    description: string | null;

    /**
     * Ссылка на эталон или антипример
     */
    exampleLink: string | null;

    /**
     * Тип примера
     */
    exampleType: ExampleType;

    /**
     * Пример текстовые
     */
    textValue: string | null;

    /**
     * Пример идентификатором файла
     */
    fileIdValue: string | null;

    file?: File | null;
};
