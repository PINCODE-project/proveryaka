import { screen, render, waitFor, fireEvent } from '@testing-library/react';

import { mockI18Next, restoreI18NextMock } from '@shared/mock/i18n';
import { createWrapper } from '@shared/mock/jest';

import { FileInput } from './FileInput';
import FileInputMockImage from './FileInput_mock.png';
import { FileInputName } from './FileInputName';

describe('shared/FileInput', () => {
    const wrapper = createWrapper({});

    beforeAll(() => {
        mockI18Next();
    });

    afterAll(() => {
        restoreI18NextMock();
    });

    it('Компонент появился в DOM дереве', async () => {
        render(
            <FileInput
                fileUrl={null}
                onChangeFile={() => {}}
                acceptType={[]}
            />, { wrapper });

        const component = await screen.findByTestId('FileInput');
        expect(component).toBeInTheDocument();
    });

    it('Отображается имя файла, если передана ссылка', async () => {
        render(
            <FileInput
                fileUrl={FileInputMockImage}
                onChangeFile={() => {}}
                acceptType={['.png']}
            >
                <FileInputName tooltipType={'name'} />
            </FileInput>, { wrapper });

        const fileNameComponent = await screen.findByTestId('FileInputName');
        expect(fileNameComponent).toBeInTheDocument();
    });

    it('При загрузке неподдерживаемого формата отображается ошибка, не сохраняется файл', async () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.svg', { type: 'image/svg' });
        const onChangeFile = jest.fn();

        render(
            <FileInput
                fileUrl={null}
                onChangeFile={onChangeFile}
                acceptType={['.png']}
            >
                <FileInputName tooltipType={'name'} />
            </FileInput>, { wrapper });

        const input = await screen.findByTestId('FileInput.input');

        await waitFor(() =>
            fireEvent.change(input, {
                target: { files: [file] },
            }),
        );

        const errorComponent = await screen.findByTestId('FileInput.placeholder.error');
        expect(errorComponent).toBeInTheDocument();
        expect(onChangeFile).not.toHaveBeenCalled();
    });

    it('При загрузке корректного файла происходит сохранение', async () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const onChangeFile = jest.fn();

        render(
            <FileInput
                fileUrl={null}
                onChangeFile={onChangeFile}
                acceptType={['.png']}
            >
                <FileInputName tooltipType={'name'} />
            </FileInput>, { wrapper });

        const input = await screen.findByTestId('FileInput.input');

        await waitFor(() =>
            fireEvent.change(input, {
                target: { files: [file] },
            }),
        );

        expect(onChangeFile).toHaveBeenCalled();
    });

    it('Выбор файла очищается', async () => {
        const onChangeFile = jest.fn();

        render(
            <FileInput
                fileUrl={'url.png'}
                onChangeFile={onChangeFile}
                acceptType={['.png']}
            >
                <FileInputName tooltipType={'name'} />
            </FileInput>, { wrapper });

        const clearButton = await screen.findByTestId('FileInputName.clearButton');

        fireEvent.click(clearButton);

        expect(onChangeFile).toBeCalledWith(null);
    });
});
