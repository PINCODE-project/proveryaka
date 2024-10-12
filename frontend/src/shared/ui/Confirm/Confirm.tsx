import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, ConfigProvider, Flex, Typography } from 'antd';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps } from '@shared/types';

import styles from './Confirm.module.css';

export type Props = ClassNameProps & Readonly<{
    /**
     * Заголовок окна.
     */
    title?: string;

    /**
     * Текстовое содержание окна.
     */
    text?: string | ReactNode;

    /**
     * Текст кнопки "Отмена".
     */
    falseButtonText?: string;

    /**
     * Текст кнопки "Ок".
     */
    trueButtonText?: string;

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
    className,
}) {
    const cancel = useCallback((): void => giveAnswer(false), [giveAnswer]);

    const agree = useCallback((): void => giveAnswer(true), [giveAnswer]);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === 'enter') {
                agree();
                event.preventDefault();
                event.stopPropagation();
            } else if (event.key === 'escape') {
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
        <Flex className={styles.wrapper} justify="center" align="start">
            <Flex
                className={getModuleClasses(styles, 'confirm', null, className)}
                vertical
                gap={12}
                align="end"
            >
                <Flex gap={8} align="start">
                    <ExclamationCircleFilled className={styles.icon} />

                    <Flex vertical gap={4}>
                        {title
                            ? <Typography.Text className={styles.title}>
                                {title}
                            </Typography.Text>
                            : null
                        }
                        <Typography.Text className={styles.text}>
                            {text}
                        </Typography.Text>
                    </Flex>
                </Flex>

                <Flex gap={8}>
                    <Button
                        onClick={cancel}
                        type="default"
                    >
                        {falseButtonText ?? 'Нет'}
                    </Button>
                    <ConfigProvider
                        theme={{ token: { colorPrimary: '#0D9E47' } }}
                    >
                        <Button
                            ref={acceptButtonRef}
                            onClick={agree}
                            type="primary"
                        >
                            {trueButtonText ?? 'Да'}
                        </Button>
                    </ConfigProvider>
                </Flex>
            </Flex>
        </Flex>
    );
});
