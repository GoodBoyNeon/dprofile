const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
