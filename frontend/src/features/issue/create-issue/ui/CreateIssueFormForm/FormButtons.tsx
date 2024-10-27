import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';

import { CreateIssueFormRequest } from '@features/issue/create-issue/model/CreateIssueFormRequest';

import { typedMemo } from '@shared/lib';

type Props = {
    forms: CreateIssueFormRequest[];
    setForms: Dispatch<SetStateAction<CreateIssueFormRequest[]>>;
    remove: (index: number) => void;
    move: (from: number, to: number) => void;
    index: number;
    length: number;
};

export const CreateIssueFormButtons: FC<Props> = typedMemo(function CreateIssueFormButtons({
    forms,
    setForms,
    remove,
    move,
    index,
    length,
}) {
    const handleMoveIssueForms = (move: (from: number, to: number) => void, oldIndex: number, newIndex: number) => {
        const newForms = [...forms];
        [newForms[oldIndex], [newForms[newIndex]]] = [newForms[newIndex], [newForms[oldIndex]]];
        setForms(newForms);
        move(oldIndex, newIndex);
    };

    const handleRemoveIssueForm = () => {
        const newForms = [...forms];
        newForms.splice(index, 1);
        setForms(newForms);
        remove(index);
    };

    return (
        <div>
            {index !== length - 1 && (
                <Button
                    icon={<DownOutlined />}
                    type="text"
                    onClick={e => {
                        e.stopPropagation();
                        handleMoveIssueForms(move, index, index + 1);
                    }}
                />
            )}
            {index !== 0 && (
                <Button
                    icon={<UpOutlined />}
                    type="text"
                    onClick={e => {
                        e.stopPropagation();
                        handleMoveIssueForms(move, index, index - 1);
                    }}
                />
            )}
            <Button
                icon={<DeleteOutlined style={{ color: '#FF4D4F' }} />}
                type="text"
                onClick={() => handleRemoveIssueForm()}
            />
        </div>
    );
});
