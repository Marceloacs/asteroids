export default function parsePayloadDate(date: string | undefined, alt: Date): Date {
    if (!date) return alt;
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? alt : parsedDate;
}