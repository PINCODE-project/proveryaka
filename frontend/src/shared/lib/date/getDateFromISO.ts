import dayjs from "dayjs";

export function getDateFromISO(date: string): string{
    return dayjs(date).format('DD.MM.YYYY')
}
