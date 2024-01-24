export default function notNegative(value: number): boolean {
  let res;
  value >= 0 ? (res = true) : (res = false);
  return res;
}
