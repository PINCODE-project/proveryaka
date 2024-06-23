import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('shared/Input', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<Input data-testid="Input" />);

        const component = await screen.findByTestId('Input');

        expect(component).toBeInTheDocument();
    });

    it('Вызывается onChange с введенным текстом', async () => {
        const setValue = jest.fn();
        render(
            <Input
                data-testid="Input"
                value=""
                onChange={event => setValue(event.target.value)}
            />,
        );

        const component = await screen.findByTestId('Input');

        await userEvent.type(component, 'test input');
        expect(setValue.mock.calls).toEqual('test input'.split('').map(x => [x]));
    });

    it('Не вызывается onChange при наличии свойства disabled', async () => {
        const setValue = jest.fn();
        render(
            <Input
                data-testid="Input"
                value=""
                onChange={event => setValue(event.target.value)}
                disabled
            />,
        );

        const component = await screen.findByTestId('Input');

        await userEvent.type(component, 'test input');
        expect(setValue).not.toBeCalled();
    });
});
