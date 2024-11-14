import { App, Button, Form } from 'antd';
import { FC, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useEditSpace } from '@features/space/edit-space';
import { EditSpaceRequest } from '@features/space/edit-space/model/EditSpaceRequest';

import { getSpacesQueryKey, Space, SpaceForm } from '@entities/space';
import { getSpaceQueryKey } from '@entities/space/lib/getSpaceQueryKey';
import { useGetSpace } from '@entities/space/lib/useGetSpace';
import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';

import { getFile } from '@shared/api';
import { createFile } from '@shared/api/file/createFile';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Content.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    onClose: () => void;
}>;

export const Content: FC<Props> = typedMemo(function Content({
    spaceId,
    onClose,
}) {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();

    const { data: space } = useGetSpace(spaceId);
    const [initialValues, setInitialValues] =
        useState<EditSpaceRequest | undefined>(undefined);
    const [initialFile, setInitialFile] = useState<File | null>(null);

    const getInitialValues = useCallback(async () => {
        if (!space) {
            return;
        }
        const file = space.iconFileId ? await getFile(space.iconFileId) : null;
        setInitialFile(file);

        setInitialValues({
            iconFileId: null,
            name: space.name,
            accessType: space.accessType,
            description: space.description,
        });
    }, [space]);

    useEffect(() => {
        getInitialValues();
    }, [getInitialValues]);

    const { mutate: edit } = useEditSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey());
            queryClient.resetQueries(getSpaceQueryKey(spaceId));
            notification.success({
                message: 'Пространство изменено',
            });
            onClose();
        },
    });

    const onSubmit = useCallback(async (form: EditSpaceRequest, file: File | null) => {
        let iconFileId = form.iconFileId;
        try {
            if (file) {
                iconFileId = (await createFile(file)).id;
            }
            // Обработка ошибки прописана в interceptor, здесь же необходим try для того
            // чтобы избежать выпадения ошибки здесь
        } catch {}

        edit({
            ...form,
            id: spaceId,
            accessType: space?.accessType ?? SpaceAccessType.Closed,
            iconFileId: iconFileId ?? null,
        });
    }, [edit, spaceId, space]);

    return (
        <SpaceForm
            submit={onSubmit}
            initialValues={initialValues as Space}
            initialFile={initialFile}
            submitButton={(
                <Form.Item className={styles.submitButton}>
                    <Button type="primary" htmlType="submit" block>
                        Сохранить
                    </Button>
                </Form.Item>
            )}
        />
    );
});
