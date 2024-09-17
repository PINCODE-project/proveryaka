/**
 * Метод получения нормального значения для Upload из Form.Item
 * @param event В antd этот тип тоже any
 */
// eslint-disable-next-line
export function getFormItemUploadNotFileValue(event: any) {
    if (Array.isArray(event)) {
        return event;
    }
    return event?.fileList;
}
