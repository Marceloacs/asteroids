export function parseDateParam(date: string, alt: Date) {
    const d = !date || isNaN(Date.parse(date)) ? alt : new Date(date);
    return d.toISOString().split("T")[0];
}