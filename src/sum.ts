export const sum = (a: number): any => {
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
