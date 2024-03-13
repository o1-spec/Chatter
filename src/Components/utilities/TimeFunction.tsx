export default function TimeFunction(time) {
  const timestampInSeconds = time;

  const timestampInMilliseconds = timestampInSeconds * 1000;

  const date = new Date(timestampInMilliseconds);

  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  time = formattedDate;
}
