import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

import { typedMemo } from '@shared/lib';

import { CreateIssueMaterialDraftRequest } from '../../model/CreateIssueMaterialDraftRequest';

type MaterialButtonsProps = {
    remove: (index: number) => void;
    move: (from: number, to: number) => void;
    index: number;
    length: number;
    materials: CreateIssueMaterialDraftRequest[];
    setMaterials: Dispatch<SetStateAction<CreateIssueMaterialDraftRequest[]>>;
};

export const MaterialButtons: FC<MaterialButtonsProps> = typedMemo(function MaterialButtons({
    remove,
    move,
    index,
    length,
    materials,
    setMaterials,
}) {
    const handleRemoveMaterial = () => {
        const newMaterials = [...materials];
        newMaterials.splice(index, 1);
        setMaterials(newMaterials);
        remove(index);
    };

    const handleMoveMaterial = (oldIndex: number, newIndex: number) => {
        move(oldIndex, newIndex);
        const newMaterials = [...materials];
        [newMaterials[oldIndex], newMaterials[newIndex]] = [newMaterials[newIndex], newMaterials[oldIndex]];
        setMaterials(newMaterials);
    };

    return (
        <div>
            {index !== length - 1 && (
                <Button
                    icon={<DownOutlined />}
                    type="text"
                    onClick={e => {
                        e.stopPropagation();
                        handleMoveMaterial(index, index + 1);
                    }}
                />
            )}
            {index !== 0 && (
                <Button
                    icon={<UpOutlined />}
                    type="text"
                    onClick={e => {
                        e.stopPropagation();
                        handleMoveMaterial(index, index - 1);
                    }}
                />
            )}
            <Button
                icon={<DeleteOutlined style={{ color: '#FF4D4F' }} />}
                type="text"
                onClick={handleRemoveMaterial}
            />
        </div>
    );
});
