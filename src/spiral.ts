export const spiral = (mySpiral: number[][]): number[] => {
  const linedArray = [];
  for (let i = 0; i <= mySpiral.length; i++) {
    i = 0;
    linedArray.push(mySpiral.shift());
    mySpiral.map((row) => linedArray.push(row.pop()));
    // eslint-disable-next-line no-param-reassign
    mySpiral = mySpiral.map((row) => row.reverse()).reverse();
  }

  return (linedArray as unknown) as number[];
};
