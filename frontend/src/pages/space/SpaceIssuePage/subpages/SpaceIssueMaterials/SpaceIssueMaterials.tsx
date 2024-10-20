import { Flex, Typography } from 'antd';
import { FC } from 'react';

import { useGetIssueMaterials, IssueMaterialType } from '@entities/issue';

import { useIssueId } from '@shared/hooks';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { MaterialFile } from './MaterialFile';
import styles from './SpaceIssueMaterials.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceIssueMaterials: FC<Props> = typedMemo(function SpaceIssueMaterials() {
    const issueId = useIssueId();
    const { data: materials } = useGetIssueMaterials(issueId ?? '');

    return (
        <Flex vertical gap={50} className={styles.root}>
            {materials?.entityList?.map(material => (
                <Flex vertical gap={24} key={material.id}
                    align="start"
                >
                    <Flex vertical gap={12}>
                        <Typography className={styles.name}>{material.name}</Typography>
                        <Typography className={styles.text}>{material.description}</Typography>
                    </Flex>

                    {material.type === IssueMaterialType.Text
                        ? <Typography className={styles.text}>{material.text}</Typography>
                        : material.type === IssueMaterialType.File
                            ? material.fileId && <MaterialFile fileId={material.fileId} />
                            : <Typography.Link href={material.text ?? ''}>
                                {material.text}
                            </Typography.Link>}
                </Flex>
            ))}
        </Flex>
    );
});
