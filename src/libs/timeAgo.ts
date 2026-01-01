export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const postedAt = new Date(dateString);
  const diffInMs = now.getTime() - postedAt.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} Second`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} Minute`;
  } else if (diffInHours < 24) {
    return `${diffInHours} Hour`;
  } else if (diffInDays < 7) {
    return `${diffInDays} Day`;
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 7)} Week`;
  } else {
    return `${Math.floor(diffInDays / 365)} Year`;
  }
}
