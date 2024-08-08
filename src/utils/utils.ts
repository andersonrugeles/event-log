
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export default function isValidDate(dateString: string) {
  return dateRegex.test(dateString);
}