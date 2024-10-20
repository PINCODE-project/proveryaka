export enum IssueStatus {
    CloseSubmit,
    OpenSubmit,
    NotAllChecked,
    ChecksExpired,
    AllChecked,
    SubmitExpired,
    Submitted,
    OnCheck,
    CheckExpired,
    Checked,
    NeedCheck,
    UnknownStatus
}

export const IssueStringStatus: Record<string, string> = {
    CloseSubmit: 'Не опубликовано',
    OpenSubmit: 'Открыта сдача',
    NotAllChecked: 'На проверке',
    ChecksExpired: 'Просрочена проверка',
    AllChecked: 'Проверено',
    SubmitExpired: 'Просрочено',
    Submitted: 'Сдано',
    OnCheck: 'На проверке',
    CheckExpired: 'Просрочена проверка',
    Checked: 'Проверено',
    NeedCheck: 'Ожидается проверка',
    UnknownStatus: 'Неизвестный статус',
};
