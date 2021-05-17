import { hof } from './curry';

describe('it should return correct value', () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    console.log = originalConsoleLog;
  });

  it('should return 15', () => {
    console.log(hof(1, 2, 3, 4, 5));
    expect(console.log).toHaveBeenCalledWith(15);
  });

  it('should return 20', () => {
    console.log(hof(2, 3, 4)(5, 6));
    expect(console.log).toHaveBeenCalledWith(20);
  });
  it('should return 25', () => {
    console.log(hof(3, 4)(5, 6)(7));
    expect(console.log).toHaveBeenCalledWith(25);
  });
  it('should return 30', () => {
    console.log(hof(4, 5)(6)(7, 8)); // 30
    expect(console.log).toHaveBeenCalledWith(30);
  });
  it('should return 35', () => {
    console.log(hof(5)(6)(7)(8)(9)); // 35
    expect(console.log).toHaveBeenCalledWith(35);
  });
});
