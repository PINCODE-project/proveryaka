export enum Status {
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
    [Status.CloseSubmit]: 'Не опубликовано',
    [Status.OpenSubmit]: 'Открыта сдача',
    [Status.NotAllChecked]: 'На проверке',
    [Status.ChecksExpired]: 'Проверка просрочена',
    [Status.AllChecked]: 'Проверено',
    [Status.SubmitExpired]: 'Сдача просрочена',
    [Status.Submitted]: 'Сдано',
    [Status.OnCheck]: 'На проверке',
    [Status.CheckExpired]: 'Просрочена проверка',
    [Status.Checked]: 'Проверено',
    [Status.NeedCheck]: 'Ожидается проверка',
    [Status.UnknownStatus]: 'Неизвестный статус',
};
