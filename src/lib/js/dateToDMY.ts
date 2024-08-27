export default function getDateString(date: Date, locale: string): string {
	const dateStr = date.toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return dateStr;
}
