import { render, screen } from '@testing-library/react';

import { ExpandIcon } from './ExpandIcon';

describe('shared/ExpandIcon', () => {
    it('Компонент появился в DOM дереве', async () => {
        render(<ExpandIcon isExpanded={false} />);

        const component = await screen.findByTestId('ExpandIcon');
        expect(component).toBeInTheDocument();
    });
});
