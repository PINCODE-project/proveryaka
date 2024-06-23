import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createWrapper } from '@shared/mock/jest';

import { Option } from './Option/Option';
import { Select } from './Select';

describe('shared/Select', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(
            <Select onSelect={jest.fn()} data-testid="Select">
                <Option value={1} label='test 1' data-testid="Option-1"></Option>
            </Select>,
            { wrapper });

        const component = await screen.findByTestId('Select');
        expect(component).toBeInTheDocument();
    });

    it('При нажатии вызывается onSelect', async () => {
        const onSelect = jest.fn();
        render(
            <Select onSelect={onSelect} data-testid="Select">
                <Option value={1} label='test 1' data-testid="Option-1"></Option>
            </Select>,
            { wrapper });

        const select = await screen.findByTestId('Select');
        await userEvent.click(select);

        const option = await screen.findByTestId('Option-1');
        await userEvent.click(option);

        expect(onSelect).toBeCalled();
        expect(onSelect.mock.calls[0][0][0].value).toEqual(1);
        expect(onSelect.mock.calls[0][0][0].label).toEqual('test 1');
    });

    it('При выборе другого элемента заменяется выбранный при single select', async () => {
        const onSelect = jest.fn();
        render(
            <Select
                onSelect={onSelect}
                data-testid="Select"
                isTreeSelect
                selectedValues={[{ value: 1, label: 'test 1' }]}
            >
                <Option value={1} label='test 1' data-testid="Option-1">
                    <Option value={2} label='test 2' data-testid="Option-2"></Option>
                </Option>
            </Select>,
            { wrapper });

        const select = await screen.findByTestId('Select');
        await userEvent.click(select);

        const option2 = await screen.findByTestId('Option-2');
        await userEvent.click(option2);
        expect(onSelect).toBeCalled();
        expect(onSelect.mock.calls[0][0][0].value).toEqual(2);
        expect(onSelect.mock.calls[0][0][0].label).toEqual('test 2');
    });

    it('При выборе другого элемента добавляется выбранный при multi select', async () => {
        const onSelect = jest.fn();
        render(
            <Select
                onSelect={onSelect}
                data-testid="Select"
                isMultiSelect
                isTreeSelect
                selectedValues={[{ value: 1, label: 'test 1' }]}
            >
                <Option value={1} label='test 1' data-testid="Option-1">
                    <Option value={2} label='test 2' data-testid="Option-2"></Option>
                </Option>
            </Select>,
            { wrapper });

        const select = await screen.findByTestId('Select');
        await userEvent.click(select);

        const option2 = await screen.findByTestId('Option-2.field');
        await userEvent.click(option2);
        expect(onSelect).toBeCalled();
        expect(onSelect.mock.calls[0][0]).toHaveLength(2);
        expect(onSelect.mock.calls[0][0][0].value).toEqual(1);
        expect(onSelect.mock.calls[0][0][0].label).toEqual('test 1');
        expect(onSelect.mock.calls[0][0][1].value).toEqual(2);
        expect(onSelect.mock.calls[0][0][1].label).toEqual('test 2');
    });

    it('При выборе того же элемента он убирается при multi select', async () => {
        const onSelect = jest.fn();
        render(
            <Select
                onSelect={onSelect}
                data-testid="Select"
                isMultiSelect
                isTreeSelect
                selectedValues={[{ value: 1, label: 'test 1' }]}
            >
                <Option value={1} label='test 1' data-testid="Option-1">
                    <Option value={2} label='test 2' data-testid="Option-2"></Option>
                </Option>
            </Select>,
            { wrapper });

        const select = await screen.findByTestId('Select');
        await userEvent.click(select);

        const option1 = await screen.findByTestId('Option-1.field');
        await userEvent.click(option1);
        expect(onSelect).toBeCalled();
        expect(onSelect.mock.calls[0][0]).toHaveLength(0);
    });

    it('При нажатии на крестик у выбранного элемента убирает его', async () => {
        const onSelect = jest.fn();
        render(
            <Select
                onSelect={onSelect}
                data-testid="Select"
                isMultiSelect
                isTreeSelect
                selectedValues={[{ value: 1, label: 'test 1' }]}
            >
                <Option value={1} label='test 1' data-testid="Option-1">
                    <Option value={2} label='test 2' data-testid="Option-2"></Option>
                </Option>
            </Select>,
            { wrapper });

        const option1Badge = await screen.findByTestId('Select.label.1.button');
        await userEvent.click(option1Badge);

        expect(onSelect).toBeCalled();
        expect(onSelect.mock.calls[0][0]).toHaveLength(0);
    });
});
