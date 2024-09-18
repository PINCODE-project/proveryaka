import { ssoHttp } from '@shared/config/axios';

type Response = {
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'student' | 'admin';
};

export function getUserIsOrganizer(): Promise<boolean> {
    return ssoHttp.get<Response>('connect/userinfo')
        .then(res => {
            return res.data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
        });
}
