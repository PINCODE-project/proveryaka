import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { createDecorators } from '@shared/mock/storybook';

import { FileInput, Props } from './FileInput';
import FileInputMock from './FileInput_mock.png';
import { FileInputImage } from './FileInputImage';
import { FileInputName } from './FileInputName';

const meta: Meta<Props> = {
    title: 'shared/FileInput',
    component: FileInput,
    decorators: createDecorators({}),
    render: props => {
        const [file, setFile] = useState<File | null>(null);
        const fileUrl = useMemo(() => {
            return file ? URL.createObjectURL(file) : null;
        }, [file]);

        return (
            <FileInput
                {...props}
                fileUrl={fileUrl}
                onChangeFile={setFile}
                acceptType={['.png', '.jpg']}
            />
        );
    },
};

export default meta;
type Story = StoryObj<Props>;

export const WithImageTooltip: Story = {
    args: {
        children: <FileInputName tooltipType={'image'} />,
    },
};

export const WithNameTooltip: Story = {
    args: {
        children: <FileInputName tooltipType={'name'} />,
    },
};

export const ImageFileInput: Story = {
    args: {
        children: <FileInputImage />,
    },
};

export const WithNameTooltipDisabled: Story = {
    args: {
        children: <FileInputName tooltipType={'name'} />,
        disabled: true,
    },
    render: props => {
        return (
            <FileInput
                {...props}
                fileUrl={FileInputMock}
                onChangeFile={() => {}}
                acceptType={['.png', '.jpg']}
            />
        );
    },
};

export const ImageFileInputDisabled: Story = {
    args: {
        children: <FileInputImage />,
        disabled: true,
    },
    render: props => {
        return (
            <FileInput
                {...props}
                fileUrl={FileInputMock}
                onChangeFile={() => {}}
                acceptType={['.png', '.jpg']}
            />
        );
    },
};
