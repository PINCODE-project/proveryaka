import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { FC, Suspense, useState } from 'react';

import { AddUserInSpaceModal } from '@features/space/add-user-in-space';

import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback } from '@shared/ui';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps;

export const SpaceUsersPage: FC<Props> = typedMemo(function SpaceUsersPage() {
    const spaceId = useSpaceId();
    const { isOrganizer } = useRolesCheck();

    const [filters, setFilters] = useState({
        search: '',
    });

    return (
        <Flex vertical gap={36}>
            <Flex align="center" justify="space-between" gap={16}>
                <Input.Search
                    placeholder="Поиск"
                    allowClear
                    onSearch={value => setFilters({ search: value })}
                    style={{ width: 300 }}
                />

                {isOrganizer
                    ? <AddUserInSpaceModal
                        spaceId={spaceId ?? ''}
                        triggerComponent={onExit => (
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={onExit}
                            >
                                Добавить участников
                            </Button>
                        )}
                    />
                    : null}
            </Flex>

            <Suspense fallback={<Fallback />}>
                <Content filters={filters} />
            </Suspense>
        </Flex>
    );
});
