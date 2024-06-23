import { screen, render } from '@testing-library/react';

import { createWrapper } from '@shared/mock/jest';

import { Modal } from './Modal';

describe('shared/Modal', () => {
    const wrapper = createWrapper({});

    it('Компонент не появился в DOM дереве, если isOpen == false и isUnmountable == true', async () => {
        render(<Modal isOpen={false} onClose={() => {}} />);

        const component = screen.queryByTestId('Modal');
        expect(component).not.toBeInTheDocument();
    });

    it('Компонент появился в DOM дереве, если isOpen == false и isUnmountable == false', async () => {
        const { rerender } = render(<Modal isOpen={false} onClose={() => {}} isUnmountable={false} />, { wrapper });
        rerender(<Modal isOpen={false} onClose={() => {}} isUnmountable={false} />);

        const component = await screen.findByTestId('Modal');
        expect(component).toBeInTheDocument();
    });

    it('Компонент появился в DOM дереве, если isOpen == true', async () => {
        const { rerender } = render(<Modal isOpen={true} onClose={() => {}} />, { wrapper });
        rerender(<Modal isOpen={true} onClose={() => {}} />);

        const component = await screen.findByTestId('Modal');
        expect(component).toBeInTheDocument();
    });
});
