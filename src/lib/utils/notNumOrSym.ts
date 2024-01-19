export function notNumOrSym(value: any): boolean {
  const res = /[a-zA-ZÀ-ÿ ]+$/.test(value);
  return res;
}
