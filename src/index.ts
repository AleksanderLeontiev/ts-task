// task 1 Currying
const func = (a: number, b: number, c: number, d: number, e: number) =>
  a + b + c + d + e;
// eslint-disable-next-line no-shadow
function curryingFunction(func: number) {
  return function curried(this: number, ...args: number[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return (...args2: number[]) => {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const hof = curryingFunction(func);
console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35

// Task 2 Adder
const sum = (a: number) => {
  let currentSum = a;
  function adder(b: number) {
    currentSum += b;
    return adder;
  }
  adder.toString = () => {
    return currentSum;
  };
  return adder;
};

alert(sum(0)); // 0
alert(sum(1)); // 1
alert(sum(1)(2)); // 3
alert(sum(3)(4)(5)); // 12
const s3 = sum(3);
alert(s3(5)); // 8
alert(s3(6)); // 9

// Task 3
class Parallel {
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  jobs(
    ...jobs: {
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
    }[]
  ) {
    const chunks = this.chunkify(jobs);
    return chunks.reduce(function compose(chain, chunk) {
      return chain.then(() => {
        const fired = chunk.map((job: () => void) => job());
        return Promise.all(fired).then(console.log);
      });
    }, Promise.resolve());
  }

  chunkify(
    items: {
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
      (): Promise<unknown>;
    }[],
    limit = this.limit
  ) {
    // eslint-disable-next-line prefer-const
    let chunks = [];
    let i = 0;
    while (i < items.length) {
      chunks.push(items.slice(i, (i += limit)));
    }
    return chunks;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createJob = (name: number, ms: number | undefined) => () =>
  new Promise((res) => setTimeout(res, ms, name));

(async function main() {
  const runner = new Parallel(5);
  await runner.jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5))
  );
})();
// Task 4
// function spiral(array: number[][] | { slice: (arg0: number) => { reverse: () => void; }; }[]): any[] | any {
//     let size = array.length;
//
//     if (size === 0)
//         return [];
//
//     if (size === 1)
//         return array[0];
//     let top = array[0].slice(0, -1);
//     let right = array.slice(0, -1).map(a => a[size]);
//     let bottom = array[size - 1].slice(1).reverse();
//     let left = array.slice(1).map(a => a[0]).reverse();
//     let inner = array.slice(1, -1).map(a => a.slice(1, -1));
//     return [].concat(top, right, bottom, left, spiral(inner));
// }
//
// const entryArray = [
//     [0, 1, 2, 3, 4],
//     [5, 6, 7, 8, 9],
//     [10, 11, 12, 13, 14],
//     [15, 16, 17, 18, 19]
// ];
// console.log(spiral(entryArray));

// Task 5 sort

function semverSort(arr: string[]) {
  // eslint-disable-next-line no-return-assign,no-param-reassign
  return (arr = arr
    .map((a) =>
      a
        .split(".")
        .map((n) => +n + 100)
        .join(".")
    )
    .sort()
    .map((a) =>
      a
        .split(".")
        .map((n) => +n - 100)
        .join(".")
    ));
}
console.log(
  semverSort([
    "1.0.5",
    "2.5.0",
    "0.12.0",
    "1",
    "1.23.45",
    "1.4.50",
    "1.2.3.4.5.6.7",
  ])
);
