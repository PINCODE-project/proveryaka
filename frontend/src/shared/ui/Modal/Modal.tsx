import { FC, MouseEventHandler, PropsWithChildren, useCallback, useEffect } from 'react';

import Cross from '@shared/assets/icons/Cross.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button } from '@shared/ui';
import { Portal } from '@shared/ui/Portal';

import styles from './Modal.module.css';

export type Props = ClassNameProps & TestProps & PropsWithChildren & Readonly<{
    /**
     * Открыто ли модальное окно
     */
    isOpen: boolean;

    /**
     * Метод закрытия модального окна
     */
    onClose?: () => void;

    /**
     * Отображать ли закрывающий крест
     * @default true
     */
    showClosingCross?: boolean;

    /**
     * Закрывать ли модальное окно по клику вне него
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;

    /**
     * Закрывать ли модальное окно по нажатию Esc
     * @default true
     */
    shouldCloseOnEsc?: boolean;

    /**
     * Размонтируется ли модальное окно из дерева
     * @default true
     */
    isUnmountable?: boolean;

    /**
     * Класс для overlay
     */
    overlayClassName?: string;
}>;

/**
 * Модальное окно
 */
export const Modal: FC<Props> = typedMemo(function Modal({
    isOpen,
    onClose,
    showClosingCross = true,
    shouldCloseOnOverlayClick = true,
    shouldCloseOnEsc = true,
    isUnmountable = true,
    className,
    children,
    overlayClassName,
    'data-testid': dataTestId = 'Modal',
}) {
    const onContentClick: MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
    };

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && shouldCloseOnEsc) {
            onClose?.();
        }
    }, [onClose, shouldCloseOnEsc]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (isUnmountable && !isOpen) {
        return null;
    }
    return (
        <Portal element={document.querySelector('#modal-portal')! as HTMLElement}>
            <div
                onClick={shouldCloseOnOverlayClick ? onClose : undefined}
                className={getBemClasses(styles, 'overlay', { isOpen }, overlayClassName)}
                data-testid={dataTestId}
            >
                <div
                    className={getBemClasses(styles, null, null, className)}
                    onClick={onContentClick}
                >
                    {showClosingCross
                        ? <Button
                            onClick={onClose}
                            isIconButton
                            size="small"
                            className={getBemClasses(styles, 'closeButton')}
                            variant="outline"
                        >
                            <Cross className={getBemClasses(styles, 'closeButtonIcon')} />
                        </Button>
                        : null}
                    {children}
                </div>
            </div>
        </Portal>
    );
});
