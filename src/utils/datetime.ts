type DateTimeParts = {
  hours: string;
  minutes: string;
  day: number;
  month: number;
  year: number;
};

export const formatSameYear = ({ hours, minutes, day, month }: DateTimeParts): string =>
  `${hours}:${minutes}, ${day} tháng ${month}`;

export const formatDifferentYear = ({ hours, minutes, day, month, year }: DateTimeParts): string =>
  `${hours}:${minutes}, ${day}/${month}/${year}`;

export const formatDateTimeDisplay = (dateTimeStr: string): string => {
  const dt = new Date(dateTimeStr);
  const now = new Date();

  const formatNumber = (num: number): string => num.toString().padStart(2, '0');

  const parts: DateTimeParts = {
    hours: formatNumber(dt.getHours()),
    minutes: formatNumber(dt.getMinutes()),
    day: dt.getDate(),
    month: dt.getMonth() + 1,
    year: dt.getFullYear(),
  };

  return parts.year !== now.getFullYear()
    ? formatDifferentYear(parts)
    : formatSameYear(parts);
};