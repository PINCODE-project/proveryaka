import { SelectOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { FC } from 'react';

import { useGetIssueMaterials, IssueMaterialType } from '@entities/issue';

import { useIssueId } from '@shared/hooks';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { DownloadFileButton } from '@shared/ui/DownloadFileButton';

import styles from './SpaceIssueMaterials.module.css';

export type Props = ClassNameProps & TestProps;

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
                        <Typography className={styles.description}>{material.description}</Typography>
                    </Flex>

                    {material.type === IssueMaterialType.Text &&
                        <Typography className={styles.text}>
                            {material.text}
                        </Typography>}

                    {material.type === IssueMaterialType.File && material.fileId
                        ? <DownloadFileButton fileId={material.fileId} microservice='estimate' />
                        : null}

                    {material.type === IssueMaterialType.Link &&
                        <Typography.Link href={material.text ?? ''}>
                            <Button type="default" icon={<SelectOutlined />}>
                                Смотреть материал
                            </Button>
                        </Typography.Link> }
                </Flex>
            ))}
        </Flex>
    );
});
