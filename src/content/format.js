const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(yyyyMm) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatPeriod(start, end) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}
