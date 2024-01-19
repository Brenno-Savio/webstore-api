export default function passwordRegex(value: string): boolean {
  const res = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(
    value,
  );
  return res;
}
