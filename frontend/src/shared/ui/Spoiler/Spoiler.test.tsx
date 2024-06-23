import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Spoiler } from './Spoiler';

describe('shared/Spoiler', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(
            <Spoiler
                renderLabel={<p data-testid="label">label</p>}
                data-testid="Spoiler"
            >
                <p data-testid="content">content</p>
            </Spoiler>,
        );

        const component = await screen.findByTestId('Spoiler');
        expect(component).toBeInTheDocument();
    });

    it('Контент появился при нажатии', async () => {
        render(
            <Spoiler
                renderLabel={<p data-testid="label">label</p>}
                data-testid="Spoiler"
            >
                <p data-testid="content">content</p>
            </Spoiler>,
        );

        const content = await screen.findByTestId('content');
        expect(content).not.toBeVisible();

        const label = await screen.findByTestId('label');
        expect(label).toBeInTheDocument();
        await userEvent.click(label);

        expect(content).toBeVisible();
    });

    it('Раскрыто по умолчанию, при isExpanded', async () => {
        render(
            <Spoiler
                renderLabel={<p data-testid="label">label</p>}
                data-testid="Spoiler"
                isExpanded
            >
                <p data-testid="content">content</p>
            </Spoiler>,
        );

        const content = await screen.findByTestId('content');
        expect(content).toBeVisible();
    });
});
