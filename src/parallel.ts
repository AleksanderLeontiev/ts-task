export class Parallel {
  // eslint-disable-next-line no-useless-constructor
  constructor(private threadCount: number) {}

  // eslint-disable-next-line @typescript-eslint/ban-types

  // () => new Promise((resolve) => setTimeout(resolve, 30, 5)),
  // eslint-disable-next-line @typescript-eslint/ban-types
  async jobs(...func: Function[]): Promise<number[]> {
    const result: number[] = []; // 1, 3, 2, 5, 4

    // eslint-disable-next-line @typescript-eslint/ban-types
    const thread = async (prom: Function): Promise<number[]> => {
      // () => new Promise((resolve) => setTimeout(resolve, 10, 1))  // () => new Promise((resolve) => setTimeout(resolve, 50, 2)), //  () => new Promise((resolve) => setTimeout(resolve, 20, 3)),  // () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
      const data = await prom();
      result.push(data);

      const job = func.shift(); //  () => new Promise((resolve) => setTimeout(resolve, 20, 3)), // () => new Promise((resolve) => setTimeout(resolve, 90, 4)), // () => new Promise((resolve) => setTimeout(resolve, 30, 5)),

      if (job) {
        await thread(job);
      }
      return result;
    };

    const arrayProm: Promise<number[]>[] = [];

    for (let i = 0; i < this.threadCount; i++) {
      const jobFunc = func.shift(); // () => new Promise((resolve) => setTimeout(resolve, 10, 1)) // () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
      if (jobFunc) {
        arrayProm.push(thread(jobFunc));
      }
    }
    await Promise.all(arrayProm);
    return result;
  }
}

const runner = new Parallel(2);

console.log(
  runner.jobs(
    () => new Promise((resolve) => setTimeout(resolve, 10, 1)),
    () => new Promise((resolve) => setTimeout(resolve, 50, 2)),
    () => new Promise((resolve) => setTimeout(resolve, 20, 3)),
    () => new Promise((resolve) => setTimeout(resolve, 90, 4)),
    () => new Promise((resolve) => setTimeout(resolve, 30, 5))
  )
); // [1, 3, 2, 4, 5];
