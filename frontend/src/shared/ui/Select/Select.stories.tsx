import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { createDecorators } from '@shared/mock/storybook';

import { Option } from './Option/Option';
import { renderOption } from './Option/renderOption';
import { Props, Select } from './Select';
import { useSelect } from './useSelect';

const meta: Meta<Props<number>> = {
    title: 'shared/Select',
    component: Select,
    decorators: createDecorators({}),
    args: {
        children: <>
            <Option value={1} label="test 1" />
            <Option value={2} label="test 2" />
            <Option value={3} label="test 3">
                <Option value={4} label="test 4">
                    <Option value={5} label="test 5" />
                    <Option value={6} label="test 6" />
                    <Option value={7} label="test 7">
                        <Option value={8} label="test 8">
                            <Option value={9} label="test 9" />
                            <Option value={10} label="test 10" />
                            <Option value={10} label="test 10" />
                        </Option>
                    </Option>
                </Option>
            </Option>
            <Option value={12} label="test 12">
                <Option value={13} label="test 13">
                    <Option value={14} label="test 14" />
                    <Option value={15} label="test 15" />
                    <Option value={16} label="test 16" />
                    <Option value={17} label="test 17" />
                </Option>
            </Option>
        </>,
    },
};

export default meta;
type Story = StoryObj<Props<number>>;

export const MultiTreeSelect: Story = {
    args: {
        isMultiSelect: true,
        isTreeSelect: true,
    },
};

export const Empty: Story = {
    args: {
        isMultiSelect: true,
        isTreeSelect: true,
        isEmpty: true,
        children: null,
    },
};

export const SingleTreeSelect: Story = {
    args: {
        isMultiSelect: false,
        isTreeSelect: true,
    },
};

export const MultiTreeSelectAtBottom: Story = {
    args: {
        isMultiSelect: true,
        isTreeSelect: true,
    },
    decorators: [
        (Story, args) => {
            return (
                <div style={{ position: 'absolute', bottom: 0, width: '400px', transform: 'translateY(-20px)' }}>
                    <Story {...args} />
                </div>
            );
        },
    ],
};

export const SingleSelect: Story = {
    args: {
        isMultiSelect: false,
        isTreeSelect: false,
    },
};

export const WithSelectAll: Story = {
    args: {
        isMultiSelect: true,
    },
    render: props => {
        const [options] = useState([{ value: 0, label: 'Item 1' }, { value: 1, label: 'Item 2' }]);
        const select = useSelect(options);

        return (
            <Select {...props} onSelect={select.setSelectedItems} selectedValues={select.selectedItems}>
                <Option
                    key="select_all"
                    value={undefined}
                    selected={select.selectedItems.length === select.visibleItems.length}
                    label="Select all"
                    onClick={() => {
                        select.setSelectedItems(
                            select.selectedItems.length === select.visibleItems.length
                                ? []
                                : select.visibleItems);
                    }}
                />
                {select.visibleItems.map(renderOption)}
            </Select>
        );
    },
};
