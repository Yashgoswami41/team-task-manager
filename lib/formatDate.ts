export function formatIndianDate(date: string | Date | null | undefined) {
  if (!date) return "No date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
