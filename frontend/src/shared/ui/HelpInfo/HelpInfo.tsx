import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FC } from 'react';

import styles from './HelpInfo.module.css';

export type Props = {
    width: number;
    title: string;
};

export const HelpInfo: FC<Props> = ({ width, title }) => {
    return (
        <Tooltip
            overlayInnerStyle={{ width, color: 'black', fontSize: '14px' }}
            color="#FFF"
            placement="right"
            title={title}
        >
            <InfoCircleOutlined
                className={styles.icon}
            />
        </Tooltip>
    );
};
