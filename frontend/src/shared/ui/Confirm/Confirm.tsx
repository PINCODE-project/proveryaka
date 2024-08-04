import { FC, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { TestProps } from '@shared/types';
import { Text, Button } from '@shared/ui';

import styles from './Confirm.module.css';

export type Props = TestProps & Readonly<{
    /**
    * Заголовок окна.
    */
    title?: string;

    /**
     * Текстовое содержание окна.
     */
    text?: string;

    /**
     * Текст кнопки "Отмена".
     */
    falseButtonText?: string;

    /**
     * Текст кнопки "Ок".
     */
    trueButtonText?: string;

    /**
     * Кастомное заполнение уведомления
     */
    contentComponent?: (giveAnswer: (answer: boolean) => void) => ReactElement;

    /**
     * Передать выбранный вариант.
     */
    giveAnswer: (answer: boolean) => void;
}>;

export const Confirm: FC<Props> = typedMemo(function Confirm({
    title,
    text,
    giveAnswer,
    falseButtonText,
    trueButtonText,
    contentComponent,
    'data-testid': dataTestId = 'Confirm',
}) {
    const { t, i18n } = useTranslation([Namespace.Common.ns]);
    const cancel = useCallback((): void => giveAnswer(false), [giveAnswer]);

    const agree = useCallback((): void => giveAnswer(true), [giveAnswer]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === 'Enter') {
                agree();
                event.preventDefault();
                event.stopPropagation();
            } else if (event.code === 'Escape') {
                cancel();
                event.preventDefault();
                event.stopPropagation();
            }
        };

        window.addEventListener('keydown', listener);
        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, [agree, cancel]);

    const acceptButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        acceptButtonRef.current?.focus();
    }, [acceptButtonRef]);

    return (
        <div className={getBemClasses(styles, 'wrapper')}>
            <div className={getBemClasses(styles)} data-testid={dataTestId}>
                {title
                    ? <Text className={getBemClasses(styles, 'title')}>
                        {title}
                    </Text>
                    : null
                }

                {contentComponent?.(giveAnswer) ??
                    <>
                        <Text className={getBemClasses(styles, 'text')}>
                            {text}
                        </Text>

                        <div className={getBemClasses(styles, 'actions')}>
                            <Button
                                ref={acceptButtonRef}
                                onClick={agree}
                                className={getBemClasses(styles, 'action')}
                                data-testid={`${dataTestId}.acceptButton`}
                            >
                                {trueButtonText ?? t('continue', Namespace.Common)}
                            </Button>
                            <Button
                                onClick={cancel}
                                variant="outline"
                                className={getBemClasses(styles, 'action')}
                                data-testid={`${dataTestId}.cancelButton`}
                            >
                                {falseButtonText ?? t('cancel', Namespace.Common)}
                            </Button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
});
