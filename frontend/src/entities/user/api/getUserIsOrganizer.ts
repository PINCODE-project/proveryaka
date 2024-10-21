import { ssoHttp } from '@shared/config/axios';

type Response = {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'student' | 'admin';
};

export async function getUserIsOrganizer(): Promise<boolean> {
    const res = await ssoHttp.get<Response>('connect/userinfo');
    return res.data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
}
