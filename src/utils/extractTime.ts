export const extractTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const hours = (date.getHours() + 1).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}