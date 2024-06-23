import { screen, fireEvent, waitFor } from '@testing-library/react';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';

import { customConfirm } from './customConfirm';

describe('shared/Confirm', () => {
    beforeAll(() => {
        mockI18Next();
        window.scrollTo = jest.fn();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Ф-ция возвращает true при нажатии на Ок', async () => {
        const answer = customConfirm({ title: 'Title', 'data-testid': 'Confirm', confirmRootInner: document.body });

        const confirm = await screen.findByTestId('Confirm');
        expect(confirm).toBeInTheDocument();

        const acceptButton = await screen.findByTestId('Confirm.acceptButton');
        fireEvent.click(acceptButton);

        await waitFor(() => expect(screen.queryByTestId('Confirm')).not.toBeInTheDocument());

        expect(await answer).toBe(true);
    });

    it('Ф-ция возвращает false при нажатии на Отмена', async () => {
        const answer = customConfirm({ title: 'Title', 'data-testid': 'Confirm', confirmRootInner: document.body });

        const confirm = await screen.findByTestId('Confirm');
        expect(confirm).toBeInTheDocument();

        const cancelButton = await screen.findByTestId('Confirm.cancelButton');
        fireEvent.click(cancelButton);

        await waitFor(() => expect(screen.queryByTestId('Confirm')).not.toBeInTheDocument());

        expect(await answer).toBe(false);
    });

    it('Ф-ция возвращает true при нажатии на Enter', async () => {
        const answer = customConfirm({ title: 'Title', 'data-testid': 'Confirm', confirmRootInner: document.body });

        const confirm = await screen.findByTestId('Confirm');
        expect(confirm).toBeInTheDocument();

        fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });

        await waitFor(() => expect(screen.queryByTestId('Confirm')).not.toBeInTheDocument());

        expect(await answer).toBe(true);
    });

    it('Ф-ция возвращает false при нажатии на Escape', async () => {
        const answer = customConfirm({ title: 'Title', 'data-testid': 'Confirm', confirmRootInner: document.body });

        const confirm = await screen.findByTestId('Confirm');
        expect(confirm).toBeInTheDocument();

        fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });

        await waitFor(() => expect(screen.queryByTestId('Confirm')).not.toBeInTheDocument());

        expect(await answer).toBe(false);
    });
});
