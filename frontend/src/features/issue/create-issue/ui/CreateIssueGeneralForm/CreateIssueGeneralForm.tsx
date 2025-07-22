import { DatePicker, Flex, Form, FormInstance, Input, InputNumber, Switch, Typography } from 'antd';
import { Store } from 'antd/es/form/interface';
import dayjs from 'dayjs';
import { FC, useEffect, useLayoutEffect, useState } from 'react';

import { CreateIssueDraftRequest } from '@features/issue/create-issue/model/CreateIssueDraftRequest';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { HelpInfo } from '@shared/ui/HelpInfo';

import styles from './CreateIssueGeneralForm.module.css';

type DeadlineProps = {
    title: string;
    deadlineDate: Date;
};

const Deadline: FC<DeadlineProps> = ({ title, deadlineDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateCountdown = (deadlineDate: Date) => {
            const now = new Date();
            const diff = deadlineDate.getTime() - now.getTime();
            if (diff <= 0) {
                setTimeLeft('Дедлайн прошел 💀');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            setTimeLeft(
                `
                    ${title} через ${days ? `${days} дн.` : ''} 
                    ${hours ? `${hours} ч.` : ''} 
                    ${!days && !hours ? '<1 час' : ''}
                `,
            );
        };

        updateCountdown(deadlineDate);
        const intervalId = setInterval(() => updateCountdown(deadlineDate), 1000);

        return () => clearInterval(intervalId);
    }, [deadlineDate, title]);

    return <Typography.Text style={{ fontSize: '12px' }}>{timeLeft}</Typography.Text>;
};

export type Props = ClassNameProps & TestProps & Readonly<{
    form: FormInstance;
    isUseTeam: boolean;
    disabled: boolean;
    initialValue: Store;
    isEdit?: boolean;
}>;

export const CreateIssueGeneralForm: FC<Props> = typedMemo(function CreateIssueGeneralForm({
    form,
    disabled,
    isUseTeam,
    initialValue,
    isEdit,
}) {
    useLayoutEffect(() => {
        form.setFieldsValue({
            ...initialValue,
            assessmentDeadlineDateUtc: dayjs(initialValue.assessmentDeadlineDateUtc),
            submitDeadlineDateUtc: dayjs(initialValue.submitDeadlineDateUtc),
        });
    }, [form, initialValue]);

    const assessmentDeadlineDateUtc = Form.useWatch('assessmentDeadlineDateUtc', form);
    const submitDeadlineDateUtc = Form.useWatch('submitDeadlineDateUtc', form);

    return (
        <Form
            form={form}
            disabled={disabled}
            style={{ maxWidth: 580 }}
            name="CreateIssueGeneral"
            layout="vertical"
            requiredMark={false}
            initialValues={{
                name: '',
                description: '',
                checksCountMin: 0,
                checksCountMax: 1,
                isUseTeam: false,
            }}
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
                    hasFeedback
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
                    hasFeedback
                >
                    <Input.TextArea
                        placeholder="Введите текст..."
                        maxLength={2047}
                        showCount
                        style={{ resize: 'vertical' }}
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
                            hasFeedback
                        >
                            <InputNumber min={0} />
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
                            dependencies={['checksCountMin']}
                            rules={[
                                { required: true, message: 'Введите количество' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value === null ||
                                            getFieldValue('checksCountMin') <= value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(
                                            'Макс. количество >= минимальное!',
                                        ));
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <HelpInfo
                            width={430}
                            title="Стольким людям будет назначено на проверку это задание"
                        />
                    </Flex>

                </Flex>

                <Flex vertical gap={16}>
                    <Flex gap={20} align="center">
                        <Form.Item<CreateIssueDraftRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            label="Дедлайн сдачи"
                            name="submitDeadlineDateUtc"
                            rules={[
                                { required: true, message: 'Выберите дату и время' },
                                () => ({
                                    validator(_, value) {
                                        if (value === null || isEdit ||
                                            value.isAfter(new Date())
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(
                                            'Дедлайн сдачи должен быть позже!',
                                        ));
                                    },
                                }),
                            ]}
                        >
                            <DatePicker showTime placeholder="Выберите дату и время" showNow={false} />
                        </Form.Item>
                        {
                            submitDeadlineDateUtc
                                ? <Deadline deadlineDate={submitDeadlineDateUtc?.toDate()} title="Дедлайн сдачи" />
                                : null
                        }
                    </Flex>

                    <Flex gap={20} align="center">
                        <Form.Item<CreateIssueDraftRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            label="Дедлайн проверки"
                            name="assessmentDeadlineDateUtc"
                            dependencies={['submitDeadlineDateUtc']}
                            rules={[
                                { required: true, message: 'Выберите дату и время' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value === null ||
                                            getFieldValue('submitDeadlineDateUtc').isBefore(value?.toDate())
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(
                                            'Дедлайн проверки должен быть позже, чем дедлайн сдачи!',
                                        ));
                                    },
                                }),
                            ]}
                        >
                            <DatePicker showTime placeholder="Выберите дату и время" showNow={false} />
                        </Form.Item>

                        {
                            assessmentDeadlineDateUtc
                                ? (
                                    <Deadline
                                        deadlineDate={assessmentDeadlineDateUtc?.toDate()}
                                        title="Дедлайн проверки"
                                    />
                                )
                                : null
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Form>
    );
});
