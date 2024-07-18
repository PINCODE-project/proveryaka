import { Dropdown, MenuProps, Table, TableProps } from 'antd';
import { FC } from 'react';

import { ChangeSpaceUserRole } from '@features/space/edit-space/sub-features/change-user-role';

import ThreeDots from '@shared/assets/icons/ThreeDots.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps } from '@shared/types';
import { Image, Text } from '@shared/ui';

import styles from './UserTable.module.css';

export type Props = ClassNameProps & Readonly<{}>;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: <ChangeSpaceUserRole
            triggerComponent={open => (<Text onClick={open}>
                Изменить роль
            </Text>)}
            username={'User Name'}
        />,
    },
    {
        key: '2',
        label: 'Удалить из пространства',
    },
];

const columns: TableProps<any>['columns'] = [
    {
        title: '',
        dataIndex: 'image',
        className: getBemClasses(styles, 'columns'),
        key: 'image',
        render: image => (<Image
            className={getBemClasses(styles, 'avatar')}
            alt="Avatar"
            src={image}
            placeholderSrc={'\thttps://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled'}
        />),
    },
    {
        title: 'ФИО',
        dataIndex: 'name',
        className: getBemClasses(styles, 'columns'),
        key: 'name',
        render: (_, record) => `${record.surname} ${record.name} ${record.patronymic}`,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        className: getBemClasses(styles, 'columns'),
        key: 'email',
    },
    {
        title: 'Дополнительно',
        dataIndex: 'status',
        className: getBemClasses(styles, 'columns'),
        key: 'status',
    },
    {
        title: '',
        key: 'action',
        className: getBemClasses(styles, 'columns'),
        render: (_, record) => (
            <Dropdown menu={{ items }}>
                <ThreeDots />
            </Dropdown>
        ),
    },
];

export const UserTable: FC<Props> = typedMemo(function UserTable({
    className,
}) {
    return (
        <Table
            className={getBemClasses(styles, null, null, className)}
            pagination={false}
            columns={columns}
            dataSource={
                [{ name: 'Name', surname: 'Surname', patronymic: 'Patronymic', email: 'Email', status: 'Status' }]
            }
        />
    );
});
