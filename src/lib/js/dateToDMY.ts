export default function dateToDMY(date: Date, locale: string): string {
	const day = date.getDate().toString().padStart(2, '0');
	const month = date.toLocaleString(locale, { month: 'long' });
	const year = date.getFullYear();
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}
