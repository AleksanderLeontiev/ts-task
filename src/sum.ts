interface IAdder {
  toString(): number;
  (b: number): IAdder;
}
export const sum = (a: number = 0): IAdder => {
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
