import { Parallel } from './parallel';

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe('Parallel', () => {
  it('is a class', () => {
    expect(Parallel).toBeInstanceOf(Function);
    expect(new Parallel(2)).toBeInstanceOf(Parallel);
  });

  it('has method .jobs', () => {
    expect(new Parallel(1).jobs).toBeInstanceOf(Function);
    expect(new Parallel(1).jobs()).toBeInstanceOf(Promise);
  });

  it('runs all jobs', async () => {
    const jobs = [jest.fn(), jest.fn(), jest.fn()];
    await new Parallel(2).jobs(...jobs);
    jobs.forEach((job) => expect(job).toHaveBeenCalled());
  });
  it('runs tasks as soon as possible', async () => {
    const parallel = new Parallel(2);
    const jobsInOrder: number[] = [];
    let jobsLine = '';
    const jobs = [...Array.from({ length: 9 })].map((_, index) => {
      const jobId = index + 1;
      const jobDuration = index + (index % 2 === 0 ? 1 : 5);
      jobsLine += `${jobId}`.repeat(jobDuration);
      return async () => {
        await sleep(jobDuration * 30);
        jobsInOrder.push(jobId);
      };
    });
    expect(jobsLine).toBe(
      '1222222333444444445555566666666667777777888888888888999999999'
    );
    await parallel.jobs(...jobs);
    console.log('jobsInOrder', jobsInOrder, 'exp', [1, 3, 2, 5, 4, 7, 6, 9, 8]);
    expect(jobsInOrder).toEqual([1, 3, 2, 5, 4, 7, 6, 9, 8]);
  });
});
