import { notification } from 'antd';
import { AxiosError } from 'axios';

import { isErrorResponse } from '@shared/lib';

/**
 * Интерсептор отправки уведомления при ошибке
 * @param error Ошибка запроса
 */
export function notifyError(error: AxiosError) {
    const errorData = error.response?.data;

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

    notification.error({
        message,
        description,
    });
}
