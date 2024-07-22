import dayjs from 'dayjs';

export function getTimeFromISO(date: string): string {
    return dayjs(date).format('HH:mm');
}
