import { Button, Flex, Modal, Typography } from 'antd';
import { FC } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

export type Props = ClassNameProps & TestProps & Readonly<{
    isOpen: boolean;
    onDeleteDraft: () => void;
    onRestoreDraft: () => void;
}>;

export const RestoreDraftModal: FC<Props> = typedMemo(function CreateTeamModal({
    isOpen,
    onDeleteDraft,
    onRestoreDraft,
}) {
    return (
        <Modal
            title="Восстановить черновик?"
            open={isOpen}
            footer={false}
            closable={false}
        >
            <Flex gap="large" vertical>
                <Typography.Text>
                    Вы уже начинали создавать задание для этого пространства. <br />
                    Хотите восстановить несохранённые данные?
                </Typography.Text>
                <Flex gap="middle" justify="center">
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={onDeleteDraft}
                    >
                        Отменить
                    </Button>
                    <Button type="primary" onClick={onRestoreDraft}>Восстановить</Button>
                </Flex>
            </Flex>
        </Modal>
    );
});
