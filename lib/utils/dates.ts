const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const timeAgo = (
  timestamp: Date | string | number | null
): string => {
  if (!timestamp) return "Never";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (Math.abs(seconds) < 60) {
    return relativeTimeFormatter.format(-Math.floor(seconds), "second");
  }

  const minutes = Math.floor(seconds / 60);
  if (Math.abs(minutes) < 60) {
    return relativeTimeFormatter.format(-minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) {
    return relativeTimeFormatter.format(-hours, "hour");
  }

  const days = Math.floor(hours / 24);
  if (Math.abs(days) < 30) {
    return relativeTimeFormatter.format(-days, "day");
  }

  const months = Math.floor(days / 30);
  if (Math.abs(months) < 12) {
    return relativeTimeFormatter.format(-months, "month");
  }

  const years = Math.floor(days / 365);
  return relativeTimeFormatter.format(-years, "year");
};

export const formatDate = (dateInput: Date | string | number | null): string => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Invalid date";

  return longDateFormatter.format(date);
};
