export default function dateToDMY(date: Date): string {
	const day = date.getDate().toString().padStart(2, '0');
	const month = date.toLocaleString('en-US', { month: 'long' });
	const year = date.getFullYear();
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}
