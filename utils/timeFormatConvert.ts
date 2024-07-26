export function convert24To12Hour(time24: string): string {
  const [hours24, minutes] = time24.split(":").map(Number);
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${hours12}:${formattedMinutes} ${period}`;
}
