import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { createDecorators } from '@shared/mock/storybook';
import { Button } from '@shared/ui';

import { Modal, Props } from './Modal';

const meta: Meta<Props> = {
    title: 'shared/Modal',
    component: Modal,
    decorators: createDecorators({}),
    render: props => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Open modal
                </Button>
                <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                   Content
                </Modal>
            </>
        );
    },
};

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
    args: {},
};

export const NotUnmountable: Story = {
    args: {
        isUnmountable: false,
    },
};

export const NotCloseWhenClickOverlay: Story = {
    args: {
        shouldCloseOnOverlayClick: false,
    },
};

export const VeryLongModal: Story = {
    render: props => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Open modal
                </Button>
                <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                    <div>dawdw</div>
                </Modal>
            </>
        );
    },
};
