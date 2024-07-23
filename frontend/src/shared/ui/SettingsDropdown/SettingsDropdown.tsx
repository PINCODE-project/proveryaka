import {Dropdown, DropdownProps} from 'antd';
import {FC} from 'react';

import ThreeDots from '@shared/assets/icons/ThreeDots.svg';
import {getBemClasses, typedMemo} from '@shared/lib';
import {ClassNameProps, TestProps} from '@shared/types';
import {FlexContainer} from '@shared/ui';

import styles from './SettingsDropdown.module.css';

export type Props = ClassNameProps & TestProps & DropdownProps & Readonly<{}>;

export const SettingsDropdown: FC<Props> = typedMemo(function SettingsDropdown({
                                                                                   className,
                                                                                   'data-testid': dataTestId = 'SettingsDropdown',
                                                                                   ...dropdownProps
                                                                               }) {
    return (
        <Dropdown
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
            {...dropdownProps}
            menu={{
                ...dropdownProps.menu,
                onClick: (event) => {
                    dropdownProps?.menu?.onClick?.(event)
                    event.domEvent.stopPropagation()
                }
            }}
        >
            <a onClick={event => {
                event.stopPropagation()
                event.preventDefault()
            }}>
            <FlexContainer
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={getBemClasses(styles, 'settings')}
            >
                <ThreeDots className={getBemClasses(styles, 'settingsIcon')}/>
            </FlexContainer>
            </a>
        </Dropdown>
    );
});
