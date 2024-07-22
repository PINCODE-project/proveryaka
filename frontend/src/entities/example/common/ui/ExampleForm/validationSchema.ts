import * as Yup from 'yup';

export const validationSchema = Yup.object({
    description: Yup.string().required('Введите описание'),
    exampleLink: Yup.string().required('Введите ссылку на пример'),
    exampleType: Yup.number().min(1, 'Выберите тип'),
});
