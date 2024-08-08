
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export default function isValidDate(dateString: string) {
  if (dateString.trim()) {
    return false;
  }
  return dateRegex.test(dateString);
}