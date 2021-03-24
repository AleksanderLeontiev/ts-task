// 1 каррирование
const carryNumber = (a, b, c, d, e) => a + b + c + d + e;
// eslint-disable-next-line no-shadow
function curryingFunction(carryNumber) {
  return function curried(...args) {
    if (args.length >= carryNumber.length) {
      return carryNumber.apply(this, args);
    }
    return (...args2) => {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const hof = curryingFunction(carryNumber);
console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35

// 2 функция сумматор=========================================
const sum = (a) => {
  let currentSum = a;
  function s(b) {
    currentSum += b;
    return s;
  }
  s.toString = () => {
    return currentSum;
  };
  return s;
};

alert(sum(0)); // 0
alert(sum(1)); // 1
alert(sum(1)(2)); // 3
alert(sum(3)(4)(5)); // 12
const s3 = sum(3);
alert(s3(5)); // 8
alert(s3(6)); // 9

// dz 3 параллельная обработка =========================
class Parallel {
  constructor(limit) {
    this.limit = limit;
  }

  jobs(...jobs) {
    const chunks = this.chunkify(jobs);
    return chunks.reduce(function compose(chain, chunk) {
      return chain.then(() => {
        const fired = chunk.map((job) => job());
        return Promise.all(fired).then(console.log);
      });
    }, Promise.resolve());
  }

  chunkify(items, limit = this.limit) {
    const chunks = [];
    let i = 0;
    while (i < items.length) {
      chunks.push(items.slice(i, (i += limit)));
    }
    return chunks;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createJob = (name, ms) => () =>
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

// dz 4 spiral
function spiral(array) {
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
  return [].concat(top, right, bottom, left, spiral(inner));
}

const entryArray = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
];
console.log(spiral(entryArray));

// dz 5 сортировка
function semverSort(arr) {
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
