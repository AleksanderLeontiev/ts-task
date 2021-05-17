const add = (a: number, b: number, c: number, d: number, e: number): number =>
  a + b + c + d + e;
const curryName = function curry(fn: (...arg: number[]) => number): any {
  const arity = fn.length;
  return function f1(...args: number[]) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return function f2(...moreArgs: number[]) {
      const newArgs = args.concat(moreArgs) as [];
      return f1(...newArgs);
    };
  };
};
export const hof: any = curryName(add);
