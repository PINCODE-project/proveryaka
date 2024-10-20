export function downloadFileByUrl(url: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
