import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().nullable().required('Введите название'),
    description: Yup.string().nullable().required('Введите описание'),
    checksCountMin: Yup.number().nullable().required('Введите мин. кол-во проверок'),
    checksCountMax: Yup.number().nullable().required('Введите мин. кол-во проверок'),
    assessmentDeadlineDateUtc: Yup.date().nullable().required('Введите дату сдачи'),
    submitDeadlineDateUtc: Yup.date().nullable().required('Введите дату оценки'),
    materialsUrl: Yup.array().of(Yup.string().required('Введите ссылку')),
});
