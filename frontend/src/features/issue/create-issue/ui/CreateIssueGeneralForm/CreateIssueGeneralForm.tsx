import { DatePicker, Flex, Form, FormInstance, Input, InputNumber, Switch } from 'antd';
import { Store } from 'antd/es/form/interface';
import dayjs from 'dayjs';
import { FC, useLayoutEffect } from 'react';

import { CreateIssueDraftRequest } from '@features/issue/create-issue/model/CreateIssueDraftRequest';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { HelpInfo } from '@shared/ui/HelpInfo';

import styles from './CreateIssueGeneralForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    form: FormInstance;
    isUseTeam: boolean;
    disabled: boolean;
    initialValue: Store;
}>;

export const CreateIssueGeneralForm: FC<Props> = typedMemo(function CreateIssueGeneralForm({
    form,
    disabled,
    isUseTeam,
    initialValue,
}) {
    useLayoutEffect(() => {
        form.setFieldsValue({
            ...initialValue,
            assessmentDeadlineDateUtc: dayjs(initialValue.assessmentDeadlineDateUtc),
            submitDeadlineDateUtc: dayjs(initialValue.submitDeadlineDateUtc),
        });
    }, [form, initialValue]);

    return (
        <Form
            form={form}
            disabled={disabled}
            style={{ maxWidth: 580 }}
            name="CreateIssueGeneral"
            layout="vertical"
            requiredMark={false}
        >
            <Flex vertical gap={32}>
                <Form.Item<CreateIssueDraftRequest>
                    className={getModuleClasses(styles, 'formItem')}
                    label="Название задания"
                    name="name"
                    rules={[
                        { required: true, message: 'Введите название задания' },
                        { max: 64, message: 'Не больше 64 символов' },
                        { min: 1, message: 'Не меньше 1 символа' },
                    ]}
                >
                    <Input
                        placeholder="Введите название..."
                        showCount
                        maxLength={64}
                    />
                </Form.Item>

                <Form.Item<CreateIssueDraftRequest>
                    className={getModuleClasses(styles, 'formItem')}
                    label="Описание"
                    name="description"
                    rules={[
                        { max: 2047, message: 'Не больше 2047 символов' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Введите текст..."
                        maxLength={2047}
                        showCount
                    />
                </Form.Item>

                {
                    !isUseTeam &&
                    <Flex gap={12} align="center">
                        <Form.Item<CreateIssueDraftRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            label="Команды"
                            name="isUseTeam"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <HelpInfo
                            width={380}
                            title={
                                'При отключении - задание сдаётся индивидуально. ' +
                                'При включении - задание сдаётся командами'
                            }
                        />
                    </Flex>
                }

                <Flex vertical gap={16}>
                    <Flex gap={12} align="center">
                        <Form.Item<CreateIssueDraftRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            label="Минимальное количество проверяющих"
                            name="checksCountMin"
                            rules={[{ required: true, message: 'Введите количество' }]}
                        >
                            <InputNumber min={0} placeholder="0" />
                        </Form.Item>
                        <HelpInfo
                            width={340}
                            title="Столько человек должны проверить задание, чтобы оно считалось проверенным"
                        />
                    </Flex>

                    <Flex gap={12} align="center">
                        <Form.Item<CreateIssueDraftRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            label="Максимальное количество проверяющих"
                            name="checksCountMax"
                            rules={[{ required: true, message: 'Введите количество' }]}
                        >
                            <InputNumber min={1} placeholder="0" />
                        </Form.Item>
                        <HelpInfo
                            width={430}
                            title="Стольким людям будет назначено на проверку это задание"
                        />
                    </Flex>

                </Flex>

                <Flex vertical gap={16}>
                    <Form.Item<CreateIssueDraftRequest>
                        className={getModuleClasses(styles, 'formItem')}
                        layout="horizontal"
                        label="Дедлайн сдачи"
                        name="submitDeadlineDateUtc"
                        rules={[{ required: true, message: 'Выберите дату и время' }]}
                    >
                        <DatePicker showTime placeholder="Выберите дату и время" showNow={false} />
                    </Form.Item>

                    <Form.Item<CreateIssueDraftRequest>
                        className={getModuleClasses(styles, 'formItem')}
                        layout="horizontal"
                        label="Дедлайн проверки"
                        name="assessmentDeadlineDateUtc"
                        rules={[{ required: true, message: 'Выберите дату и время' }]}
                    >
                        <DatePicker showTime placeholder="Выберите дату и время" showNow={false} />
                    </Form.Item>
                </Flex>
            </Flex>
        </Form>
    );
});
