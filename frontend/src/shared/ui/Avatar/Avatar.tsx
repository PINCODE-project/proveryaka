import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import { FC, useMemo } from 'react';

import { typedMemo, useGetEstimateFile } from '@shared/lib';

export type Props = Omit<AvatarProps, 'src'> & Readonly<{
    fileId: string | null;
    apiType: 'estimate' | 'solution';
}>;

export const Avatar: FC<Props> = typedMemo(function Avatar({
    fileId,
    apiType,
    ...avatarProps
}) {
    const { data: estimateFile } = useGetEstimateFile(
        fileId!,
        { enabled: Boolean(fileId) && apiType === 'estimate' },
    );
    const { data: solutionFile } = useGetEstimateFile(
        fileId!,
        { enabled: Boolean(fileId) && apiType === 'solution' },
    );

    const fileUrl = useMemo(() => {
        if (apiType === 'solution') {
            return solutionFile ? URL.createObjectURL(solutionFile) : null;
        }
        return estimateFile ? URL.createObjectURL(estimateFile) : null;
    }, [solutionFile, estimateFile, apiType]);

    return (
        <AntdAvatar {...avatarProps} src={fileUrl} />
    );
});
