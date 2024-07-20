import { Form, Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import * as Yup from 'yup';

import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';
import { useGetCurrentUserInfo } from '@entities/user';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import {
    Button,
    FileInput,
    FileInputImage,
    FlexContainer,
    FormField,
    imageAcceptTypes,
    Input,
    Textarea,
} from '@shared/ui';

import styles from './SpaceSettingsForm.module.css';
import { SpaceSettings } from '../../model/SpaceSettings';

export type Props = ClassNameProps & TestProps & Readonly<{
    form?: SpaceSettings;
    onSubmit: (form: SpaceSettings) => void;
    submitText: string;
}>;

const initialValue: SpaceSettings = {
    name: '',
    description: '',
    icon: '',
    accessType: SpaceAccessType.Private,
    organizerId: [],
};

const validationSchema = Yup.object({
    name: Yup.string().required('Введите название'),
    description: Yup.string().required('Введите описание'),
});

export const SpaceSettingsForm: FC<Props> = typedMemo(function SpaceSettingsForm({
    form,
    onSubmit: onSubmitProps,
    submitText,
}) {
    const { data: currentUser } = useGetCurrentUserInfo();
    const [fileUrl, setFileUrl] = useState<string | null>(form?.icon ?? null);

    const onSubmit = useCallback((form: SpaceSettings) => {
        const organizedId = form.organizerId ?? [];
        const data = {
            ...form,
            organizerId: organizedId.includes(currentUser!.id ?? '') ? organizedId : organizedId.concat([currentUser!.id ?? '']),
        };

        onSubmitProps(data);
    }, [currentUser, onSubmitProps]);

    return (
        <Formik initialValues={form ?? initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => (
                <Form className={getBemClasses(styles)}>
                    <FlexContainer direction="row" gap="m" alignItems="center"
                        overflow="nowrap"
                    >
                        <FormField<File | null>
                            name="iconFile"
                            className={getBemClasses(styles, 'fileInputField')}
                            content={
                                ({ onChange }) => (
                                    <FileInput
                                        className={getBemClasses(styles, 'fileInput')}
                                        placeholder={'Иконка'}
                                        fileUrl={fileUrl}
                                        onChangeFile={file => {
                                            onChange(file);
                                            setFileUrl(file && URL.createObjectURL(file));
                                        }}
                                        acceptType={imageAcceptTypes}
                                    >
                                        <FileInputImage />
                                    </FileInput>
                                )
                            }
                        />
                        <FormField<string>
                            name="name"
                            label="Название"
                            className={getBemClasses(styles, 'nameInputField')}
                            content={
                                ({ onChange, value }) => (
                                    <Input
                                        className={getBemClasses(styles, 'nameInput')}
                                        value={value}
                                        onChange={event => onChange(event.target.value)}
                                        onBlur={event => onChange(event.target.value.trim())}
                                    />
                                )
                            }
                        />
                    </FlexContainer>
                    <FormField<string>
                        name="description"
                        label="Описание"
                        content={
                            ({ onChange, value }) => (
                                <Textarea
                                    value={value}
                                    onChange={event => onChange(event.target.value)}
                                    onBlur={event => onChange(event.target.value.trim())}
                                />
                            )
                        }
                    />

                    <Button
                        onClick={() => handleSubmit()}
                        className={getBemClasses(styles, 'submitButton')}
                    >
                        {submitText}
                    </Button>
                </Form>
            )}
        </Formik>
    );
});
