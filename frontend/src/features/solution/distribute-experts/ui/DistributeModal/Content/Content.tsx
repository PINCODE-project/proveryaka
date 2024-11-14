import { Button, Flex, Form, Select, Tabs, TabsProps } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';

import { useGetSpaceExperts, useGetSpaceOrganizers, useGetSpaceStudents } from '@entities/space';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { sortSelectOptionsByLabel, typedMemo } from '@shared/lib';

import styles from './Content.module.css';
import { SetExpertToSolutionRequest } from '../../../model/SetExpertToSolutionRequest';

export type Props = Readonly<{
    onSubmit: (userIdList: string[]) => void;
}>;
export const Content: FC<Props> = typedMemo(function Content({
    onSubmit,
}) {
    const spaceId = useSpaceId();
    const [form] = Form.useForm();

    const { data: students } = useGetSpaceStudents(spaceId ?? '');
    const { data: experts } = useGetSpaceExperts(spaceId ?? '');
    const { data: organizers } = useGetSpaceOrganizers(spaceId ?? '');

    const [activeTab, setActiveTab] = useState(SpaceRoleType.Student.toString());

    const items: TabsProps['items'] = useMemo(() => ([
        {
            key: '1',
            label: 'Студенты',
            children: null,
        },
        {
            key: '2',
            label: 'Эксперты',
            children: null,
        },
        {
            key: '3',
            label: 'Организаторы',
            children: null,
        },
    ]), []);

    const users = useMemo(() => activeTab === SpaceRoleType.Student.toString()
        ? students?.studentInfoList ?? []
        : activeTab === SpaceRoleType.Expert.toString()
            ? experts?.expertsInfoList ?? []
            : organizers?.organizerInfoList ?? []
    , [activeTab, students, experts, organizers]);

    const selectAllFromGroup = useCallback(() => {
        const selectedIds: string[] = form.getFieldValue('expertProfileIdList');
        const resultIds = selectedIds.concat(users.map(({ id }) => id));
        form.setFieldValue('expertProfileIdList', Array.from(new Set(resultIds)));
    }, [form, users]);

    return (
        <Form
            form={form}
            className={styles.form}
            name="DistributeForm"
            layout="vertical"
            initialValues={{ expertProfileIdList: [] }}
            onFinish={(form: SetExpertToSolutionRequest) => onSubmit(form.expertProfileIdList)}
            requiredMark={false}
        >
            <Flex vertical gap={12}>
                <Form.Item<SetExpertToSolutionRequest>
                    name="expertProfileIdList"
                    label="Пользователи"
                >
                    <Select
                        placeholder="Выберите проверяющих"
                        allowClear
                        showSearch
                        filterOption={sortSelectOptionsByLabel}
                        dropdownRender={menu => (
                            <>
                                <Tabs activeKey={activeTab} onChange={setActiveTab} items={items}
                                    className={styles.tabs}
                                />
                                <Button type="default" onClick={selectAllFromGroup} className={styles.selectAllButton}>
                                    Выбрать всех
                                </Button>
                                {menu}
                            </>
                        )}
                        mode="multiple"
                    >
                        {users.map(item => (
                            <Select.Option value={item.id} key={item.id}>
                                {item.surname} {item.name} {item.patronymic}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item className={styles.submitButton}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    );
});
