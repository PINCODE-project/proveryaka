import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';

import styles from './CreateIssueCriteriaForm.module.css';
import { CreateIssueCriteriaDraftRequest } from '../../model/CreateIssueCriteriaDraftRequest';

type CriteriaButtonsProps = {
    remove: (index: number) => void;
    move: (from: number, to: number) => void;
    index: number;
    length: number;
    criteria: CreateIssueCriteriaDraftRequest[];
    setCriteria: Dispatch<SetStateAction<CreateIssueCriteriaDraftRequest[]>>;
};

export const CriteriaButtons: FC<CriteriaButtonsProps> = typedMemo(function CriteriaButtons({
    remove,
    move,
    index,
    length,
    criteria,
    setCriteria,
}) {
    const handleMoveCriteria = (oldIndex: number, newIndex: number) => {
        move(oldIndex, newIndex);
        const newCriteria = [...criteria];
        [newCriteria[oldIndex], newCriteria[newIndex]] = [newCriteria[newIndex], newCriteria[oldIndex]];
        setCriteria(newCriteria);
    };

    const handleRemoveCriteria = () => {
        const newCriteria = [...criteria];
        newCriteria.splice(index, 1);
        setCriteria(newCriteria);
        remove(index);
    };

    return (
        <Flex gap="middle">
            <Flex>
                {index !== length - 1 && (
                    <Button
                        icon={<DownOutlined />}
                        type="text"
                        onClick={e => {
                            e.stopPropagation();
                            handleMoveCriteria(index, index + 1);
                        }}
                    />
                )}
                {index !== 0 && (
                    <Button
                        icon={<UpOutlined />}
                        type="text"
                        onClick={e => {
                            e.stopPropagation();
                            handleMoveCriteria(index, index - 1);
                        }}
                    />
                )}
            </Flex>
            <Button
                icon={<DeleteOutlined className={getModuleClasses(styles, 'icon')} style={{ color: '#FF4D4F' }} />}
                type="text"
                color="danger"
                onClick={e => {
                    e.stopPropagation();
                    handleRemoveCriteria();
                }}
            />
        </Flex>
    );
});
