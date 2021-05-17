export function semverSort(arr: string[]): string[] {
  // eslint-disable-next-line no-return-assign,no-param-reassign
  return (arr = arr
    .map((a) =>
      a
        .split('.')
        .map((n) => +n + 100)
        .join('.')
    )
    .sort()
    .map((a) =>
      a
        .split('.')
        .map((n) => +n - 100)
        .join('.')
    ));
}
