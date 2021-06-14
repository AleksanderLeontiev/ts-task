import { curry } from './curry';

describe('it should return correct value', () => {
  it('should return 15', () => {
    const func = (a: number, b: number, c: number, d: number, e: number) =>
      a + b + c + d + e;
    const hof = curry(func);
    expect(hof(1)(2)(3)(4)(5)).toEqual(15);
    expect(hof(1, 1, 1, 1, 1)).toEqual(5);
    expect(hof(2, 3, 4)(5, 6)).toEqual(20);
    expect(hof(3, 4)(5, 6)(7)).toEqual(25);
    expect(hof(4, 5)(6)(7, 8)).toEqual(30);
    expect(hof(5)(6)(7)(8)(9)).toEqual(35);
  });
});
