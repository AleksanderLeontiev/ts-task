import { sum } from './sum';

describe('it should return correct value', () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });

  it('should return 0', () => {
    alert(sum(0).toString());
    expect(window.alert).toHaveBeenCalledWith(0);
  });
  it('should return 1', () => {
    alert(sum(1).toString());
    expect(window.alert).toHaveBeenCalledWith(1);
  });
  it('should return 3', () => {
    alert(sum(1)(2).toString());
    expect(window.alert).toHaveBeenCalledWith(3);
  });
  it('should return 12', () => {
    alert(sum(3)(4)(5).toString());
    expect(window.alert).toHaveBeenCalledWith(12);
  });
  it('should return 8', () => {
    const s3 = sum(3);
    alert(s3(5).toString());
    expect(window.alert).toHaveBeenCalledWith(8);
  });
  it('should return 9', () => {
    const s3 = sum(3);
    alert(s3(6).toString());
    expect(window.alert).toHaveBeenCalledWith(9);
  });
});
