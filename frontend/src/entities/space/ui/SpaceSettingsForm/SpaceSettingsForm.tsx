import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';

import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';

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
    inviteCode: '',
    organizerId: [],
};

const validationSchema = Yup.object({
    name: Yup.string().required('Введите название'),
    description: Yup.string().required('Введите описание'),
    inviteCode: Yup.string().required('Введите пригласительный код'),
});

export const SpaceSettingsForm: FC<Props> = typedMemo(function SpaceSettingsForm({
    className,
    form,
    onSubmit,
    submitText,
    'data-testid': dataTestId = 'SpaceSettingsForm',
}) {
    const [fileUrl, setFileUrl] = useState<string | null>(form?.icon ?? null);

    return (
        <Formik initialValues={form ?? initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
            {() => (
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
                    <FormField<string>
                        name="inviteCode"
                        label="Пригласительный код"
                        content={
                            ({ onChange, value }) => (
                                <Input
                                    value={value}
                                    onChange={event => onChange(event.target.value)}
                                    onBlur={event => onChange(event.target.value.trim())}
                                />
                            )
                        }
                    />

                    <Button type="submit" className={getBemClasses(styles, 'submitButton')}>
                        {submitText}
                    </Button>
                </Form>
            )}
        </Formik>
    );
});
