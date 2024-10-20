import { notification } from 'antd';
import { AxiosError } from 'axios';

import { isErrorResponse } from '@shared/lib';

/**
 * Интерсептор отправки уведомления при ошибке
 * @param error Ошибка запроса
 */
export async function notifyError(error: AxiosError) {
    const errorData = await parseErrorData(error);

    let message = 'Произошла ошибка';
    let description = 'Попробуйте перезагрузить страницу или повторить действие';

    // TODO: убрать после приведения ошибок ССО к одному виду (Костя)
    if ((errorData as any).error_description === 'invalid_username_or_password') {
        message = 'Неверные данные';
        description = 'Проверьте почту и пароль';
    }

    if (isErrorResponse(errorData)) {
        description = errorData.message;
    }

    if (
        'NotNotify' in Object.keys(error.response?.config.headers || {}) &&
        error.response?.config.headers.NotNotify !== 'true'
    ) {
        notification.error({
            message,
            description,
        });
    }
}

async function parseErrorData(error: AxiosError): Promise<unknown> {
    let errorData = error.response?.data;

    const isJsonBlob = (data: unknown): data is Blob => data instanceof Blob && data.type === 'application/json';

    if (isJsonBlob(errorData)) {
        const rawErrorData = await errorData.text();
        errorData = JSON.parse(rawErrorData);
    }

    return errorData;
}
