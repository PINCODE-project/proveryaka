import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Введите название'),
    description: Yup.string().required('Введите описание'),
    minScore: Yup.number().required('Введите мин. оценку'),
    maxScore: Yup.number().required('Введите макс. оценку'),
    weight: Yup.number().required('Введите оценочный вес'),
});
