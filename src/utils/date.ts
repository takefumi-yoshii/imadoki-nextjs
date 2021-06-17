function padzero(num: number, digit = 2) {
  return `0000000${num}`.slice(digit * -1);
}
export function now() {
  const japanStandardTime = new Date().toLocaleString(undefined, {
    timeZone: "Asia/Tokyo",
  });
  const date = new Date(japanStandardTime);
  const hours = padzero(date.getHours());
  const minutes = padzero(date.getMinutes());
  const seconds = padzero(date.getSeconds());
  const time = `${hours}:${minutes}:${seconds}`;
  const year = date.getFullYear();
  const month = padzero(date.getMonth() + 1);
  const _date = padzero(date.getDate());
  const day = `${year}/${month}/${_date}`;
  return `${day}__${time}`;
}
