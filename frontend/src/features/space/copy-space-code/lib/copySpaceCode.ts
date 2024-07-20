import { toast } from 'react-toastify';

export async function copySpaceCode(inviteCode: string) {
    try {
        await window.navigator.clipboard.writeText(inviteCode);
        toast.success('Пригласительный код скопирован!');
    } catch (err) {
        toast.error('Не удалось скопировать код');
    }
}
