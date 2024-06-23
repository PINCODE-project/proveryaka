import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from './Textarea';

describe('shared/Textarea', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<Textarea data-testid="Textarea" />);

        const component = await screen.findByTestId('Textarea');

        expect(component).toBeInTheDocument();
    });

    it('Вызывается onChange с введенным текстом', async () => {
        const setValue = jest.fn();
        render(
            <Textarea
                data-testid="Textarea"
                value=""
                onChange={event => setValue(event.target.value)}
            />,
        );

        const component = await screen.findByTestId('Textarea');

        await userEvent.type(component, 'test input');
        expect(setValue.mock.calls).toEqual('test input'.split('').map(x => [x]));
    });

    it('Не вызывается onChange при наличии свойства disabled', async () => {
        const setValue = jest.fn();
        render(
            <Textarea
                data-testid="Textarea"
                value=""
                onChange={event => setValue(event.target.value)}
                disabled={true}
            />,
        );

        const component = await screen.findByTestId('Textarea');

        await userEvent.type(component, 'test input');
        expect(setValue).not.toBeCalled();
    });
});
