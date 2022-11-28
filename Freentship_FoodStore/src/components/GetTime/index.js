export default function TimeOrder(time) {
  const date = new Date(time);
  const hoursAndMinutes = date.getHours() + ":" + date.getMinutes();
  return hoursAndMinutes;
}
