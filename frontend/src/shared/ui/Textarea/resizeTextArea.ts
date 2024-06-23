export function resizeTextArea(element: HTMLTextAreaElement): void {
    element.style.height = '0px';
    element.style.height = `${element.scrollHeight + 5}px`;
}
