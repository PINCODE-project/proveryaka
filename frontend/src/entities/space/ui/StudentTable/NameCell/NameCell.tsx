import { Avatar, Flex, Typography } from 'antd';
import { FC, useMemo } from 'react';

import { typedMemo } from '@shared/lib';
import { useGetEstimateFile } from '@shared/lib/file/useGetEstimateFile';
import { ClassNameProps, TestProps } from '@shared/types';

import { GetStudentResponse } from '../../../model/GetStudentResponse';

export type Props = ClassNameProps & TestProps & Readonly<{
    user: GetStudentResponse;
}>;

export const NameCell: FC<Props> = typedMemo(function NameCell({
    user,
}) {
    const { data: file } = useGetEstimateFile(user.avatar!, { enabled: user.avatar !== null });
    const fileUrl = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

    return (
        <Flex gap="small" align="center">
            <Avatar size={32} src={fileUrl} shape="square" />
            <Typography.Text>
                {user.surname} {user.name} {user.patronymic}
            </Typography.Text>
        </Flex>
    );
});
