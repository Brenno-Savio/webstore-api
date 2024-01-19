export default function cepMask(value: string, index: number): string {
  if(value.includes('-')) return value;
  const splitValue = [value.slice(0, index), value.slice(index)];
  const newValue = splitValue[0] + '-' + splitValue[1];
  return newValue;
}
