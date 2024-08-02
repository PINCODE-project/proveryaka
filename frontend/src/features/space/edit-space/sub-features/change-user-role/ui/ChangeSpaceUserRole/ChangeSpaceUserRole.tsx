import { Modal, Select } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';

import { roles } from '@shared/consts';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer } from '@shared/ui';

import styles from './ChangeSpaceUserRole.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
    username: string;
}>;

export const ChangeSpaceUserRole: FC<Props> = typedMemo(function ChangeSpaceUserRole({
    triggerComponent,
    username,
    className,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([roles[0]]);

    const change = useCallback(() => {
        setIsOpen(false);
    }, [selectedRoles]);

    return (
        <>
            {triggerComponent(() => setIsOpen(true))}
            <Modal
                title={`Изменить роль ${username}`}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                okText="Изменить"
                cancelText="Отмена"
                footer={false}
                className={getBemClasses(styles, null, null, className)}
            >
                <Select
                    value={selectedRoles}
                    onChange={setSelectedRoles}
                    className={getBemClasses(styles, 'select')}
                >
                    {roles.map(role => (
                        <Select.Option value={role.value}>{role.label}</Select.Option>
                    ))}
                </Select>

                <FlexContainer
                    direction="row"
                    gap="m"
                    justifyContent="end"
                    className={getBemClasses(styles, 'actions')}
                >
                    <Button onClick={change}>Изменить</Button>
                </FlexContainer>
            </Modal>
        </>
    );
});
