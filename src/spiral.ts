export function spiral(array: number[][]): number[] {
  const size = array.length;
  if (size === 0) return [];
  if (size === 1) return array[0];

  const top = array[0].slice(0, -1);

  const right = array.slice(0, -1).map((a) => a[size]);
  const bottom = array[size - 1].slice(1).reverse();
  const left = array
    .slice(1)
    .map((a) => a[0])
    .reverse();
  const inner = array.slice(1, -1).map((a) => a.slice(1, -1));
  const result: number[] = [];
  return result.concat(top, right, bottom, left, spiral(inner));
}
