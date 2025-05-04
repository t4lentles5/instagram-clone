export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffInSeconds <= 1) return 'now';
  if (diffInSeconds < minute) return `${diffInSeconds}s`;
  if (diffInSeconds < hour) return `${Math.floor(diffInSeconds / minute)}m`;
  if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)}h`;
  if (diffInSeconds < week) return `${Math.floor(diffInSeconds / day)}d`;
  if (diffInSeconds < 4 * week) return `${Math.floor(diffInSeconds / week)}w`;

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
