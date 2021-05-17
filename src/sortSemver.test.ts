import { semverSort } from './sortSemver';

describe('it should return correct value', () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    window.alert = originalAlert;
  });

  it('should return true', () => {
    expect(
      JSON.stringify(
        semverSort([
          '1.0.5',
          '2.5.0',
          '0.12.0',
          '1',
          '1.23.45',
          '1.4.50',
          '1.2.3.4.5.6.7',
        ])
      )
    ).toEqual(
      JSON.stringify([
        '0.12.0',
        '1',
        '1.0.5',
        '1.2.3.4.5.6.7',
        '1.4.50',
        '1.23.45',
        '2.5.0',
      ])
    );
  });
});
