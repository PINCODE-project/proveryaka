import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createWrapper } from '@shared/mock/jest';

import { Button } from './Button';

describe('shared/Button', () => {
    const wrapper = createWrapper({});

    it('Компонент появился в DOM дереве', async () => {
        render(<Button data-testid="Input" />, { wrapper });

        const component = await screen.findByTestId('Input');

        expect(component).toBeInTheDocument();
    });

    it('Вызывается onClick', async () => {
        const onClick = jest.fn();
        render(
            <Button
                data-testid="Button"
                value=""
                onClick={event => onClick(event)}
            />,
            { wrapper },
        );

        const component = await screen.findByTestId('Button');

        await userEvent.click(component);
        expect(onClick).toBeCalled();
    });

    it('Не вызывается onClick при наличии свойства disabled', async () => {
        const onClick = jest.fn();
        render(
            <Button
                data-testid="Button"
                value=""
                onClick={event => onClick(event)}
                disabled
            />,
            { wrapper },
        );

        const component = await screen.findByTestId('Button');

        await userEvent.click(component);
        expect(onClick).not.toHaveBeenCalled();
    });
});
