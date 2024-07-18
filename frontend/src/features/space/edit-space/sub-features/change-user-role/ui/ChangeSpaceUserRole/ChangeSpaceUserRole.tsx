import { Modal, Select } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, renderOption, SelectItem } from '@shared/ui';

import styles from './ChangeSpaceUserRole.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
    username: string;
}>;

const roles: SelectItem<number>[] = [
    { value: 0, label: 'Студент' },
    { value: 1, label: 'Эксперт' },
    { value: 2, label: 'Организатор' },
];

export const ChangeSpaceUserRole: FC<Props> = typedMemo(function ChangeSpaceUserRole({
    triggerComponent,
    username,
    className,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([roles[0]]);

    const change = useCallback(() => {
        console.log(selectedRoles);
        setIsOpen(false);
    }, [selectedRoles]);

    return (
        <>
            {triggerComponent(() => setIsOpen(true))}
            <Modal
                title={`Изменить роль ${username}`}
                open={isOpen}
                onOk={console.log}
                onCancel={console.log}
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
                    <Select.Option value="1">Студент</Select.Option>
                    <Select.Option value="2">Эксперт</Select.Option>
                    <Select.Option value="3">Организатор</Select.Option>
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
