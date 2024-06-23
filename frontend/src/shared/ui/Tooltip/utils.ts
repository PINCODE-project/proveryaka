/**
 * Изменить максимальную высоту подсказки, если она не влезает на экран
 * @param tooltipId Id подсказки
 * @param anchorId Id элемента с подсказкой
 */
export function changeTooltipMaxHeight(tooltipId: string, anchorId: string) {
    const tooltip = document.body.querySelector(`#${tooltipId}`) as HTMLElement | null;
    const anchor = document.body.querySelector(`#${anchorId}`) as HTMLElement | null;
    if (!tooltip || !anchor) return;

    const position = anchor.getBoundingClientRect();
    const padding = 16;
    const placeOnTop = position.y - padding;
    const placeOnBottom = document.body.clientHeight - position.y - position.height - padding;
    tooltip.style.height = placeOnBottom + 'px';
    if (placeOnTop < tooltip.clientHeight && placeOnBottom < tooltip.clientHeight) { tooltip.style.maxHeight = placeOnBottom + 'px'; }
}
