// eslint-disable-next-line import/named
import { hof, sum, spiral, semverSort } from "./dz";
/* eslint-disable no-console */
describe("it should return correct value", () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    console.log = originalConsoleLog;
  });

  it("should return 15", () => {
    console.log(hof(1, 2, 3, 4, 5));
    expect(console.log).toHaveBeenCalledWith(15);
  });

  it("should return 20", () => {
    console.log(hof(2, 3, 4)(5, 6));
    expect(console.log).toHaveBeenCalledWith(20);
  });
  it("should return 25", () => {
    console.log(hof(3, 4)(5, 6)(7));
    expect(console.log).toHaveBeenCalledWith(25);
  });
  it("should return 30", () => {
    console.log(hof(4, 5)(6)(7, 8)); // 30
    expect(console.log).toHaveBeenCalledWith(30);
  });
  it("should return 35", () => {
    console.log(hof(5)(6)(7)(8)(9)); // 35
    expect(console.log).toHaveBeenCalledWith(35);
  });
});

/* eslint-disable no-alert */
// eslint-disable-next-line jest/no-identical-title
describe("it should return correct value", () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });

  it("should return 0", () => {
    alert(sum(0).toString());
    expect(window.alert).toHaveBeenCalledWith(0);
  });
  it("should return 1", () => {
    alert(sum(1).toString());
    expect(window.alert).toHaveBeenCalledWith(1);
  });
  it("should return 3", () => {
    alert(sum(1)(2).toString());
    expect(window.alert).toHaveBeenCalledWith(3);
  });
  it("should return 12", () => {
    alert(sum(3)(4)(5).toString());
    expect(window.alert).toHaveBeenCalledWith(12);
  });
  it("should return 8", () => {
    const s3 = sum(3);
    alert(s3(5).toString());
    expect(window.alert).toHaveBeenCalledWith(8);
  });
  it("should return 9", () => {
    const s3 = sum(3);
    alert(s3(6).toString());
    expect(window.alert).toHaveBeenCalledWith(9);
  });
});

describe("getNewCellState", () => {
  it("should return valid new state", () => {
    expect(
      spiral([
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
      ]).join()
    ).toBe(
      [
        0,
        1,
        2,
        3,
        4,
        9,
        14,
        19,
        18,
        17,
        16,
        15,
        10,
        5,
        6,
        7,
        8,
        13,
        12,
        11,
      ].join()
    );
  });
});

/* eslint-disable no-else-return */
// eslint-disable-next-line jest/no-identical-title
describe("it should return correct value", () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });

  it("should return true", () => {
    expect(
      JSON.stringify(
        semverSort([
          "1.0.5",
          "2.5.0",
          "0.12.0",
          "1",
          "1.23.45",
          "1.4.50",
          "1.2.3.4.5.6.7",
        ])
      )
    ).toEqual(
      JSON.stringify([
        "0.12.0",
        "1",
        "1.0.5",
        "1.2.3.4.5.6.7",
        "1.4.50",
        "1.23.45",
        "2.5.0",
      ])
    );
  });
});
