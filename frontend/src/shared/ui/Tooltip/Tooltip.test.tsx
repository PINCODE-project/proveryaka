import { render, screen } from '@testing-library/react';

import { Tooltip } from './Tooltip';

window.ResizeObserver = window.ResizeObserver ??
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

describe('shared/Tooltip', () => {
    it('Компонент не появился в DOM дереве', async () => {
        render(<Tooltip id="tooltip-id">
            <p data-testid="TooltipId">tooltip</p>
        </Tooltip>);

        const component = screen.queryByRole('tooltip');

        expect(component).toEqual(null);
    });
});
