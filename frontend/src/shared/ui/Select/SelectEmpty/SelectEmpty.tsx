import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Namespace } from '@shared/config/i18n';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Text } from '@shared/ui';

import styles from './SelectEmpty.module.css';

export type Props = ClassNameProps & TestProps;

export const SelectEmpty: FC<Props> = typedMemo(function SelectEmpty({
    className,
    'data-testid': dataTestId = 'SelectEmpty',
}) {
    const { t } = useTranslation([Namespace.Common.ns]);

    return (
        <Text
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {t('core_no_matches_found')}
        </Text>
    );
});
