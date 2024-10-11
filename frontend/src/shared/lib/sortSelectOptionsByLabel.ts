export function sortSelectOptionsByLabel(input: string, option?: {children: string[]}): boolean {
    return (option?.children ?? []).some(item => item.toLowerCase().includes(input.toLowerCase()));
}
