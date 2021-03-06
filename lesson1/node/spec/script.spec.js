const { pow, sum } = require('../foreignCode/index');

describe('Функция pow()', () => {
  it('должна возвращать 9 при аргументах (3, 2)', () => {
    expect(pow(3, 2)).toBe(9);
  });

  it('должна возвращать 1 при аргументах (0, 0)', () => {
    expect(pow(0, 0)).toBe(1);
  });

  it('должна возвращать 4 при аргументах (-2,2)', () => {
    expect(pow(-2, 2)).toBe(4);
  });

  it('должна возвращать null при аргументах (null, 2)', () => {
    expect(pow(null, 2)).toBeNull();
  });

  it('должна возвращать null при передаче строк', () => {
    expect(pow('a', 2)).toBeNull();
  });

  it('должна возвращать null при передаче объектов', () => {
    expect(pow({ a: 3 }, [])).toBeNull();
  });
});

describe('Функция sum()', () => {
  it('должна возвращать 5 при аргументах (3, 2)', () => {
    expect(sum(3, 2)).toBe(5);
  });

  it('должна возвращать -30 при аргументах (-10, -20)', () => {
    expect(sum(-10, -20)).toBe(-30);
  });

  it('должна возвращать -30 при аргументах (0, 1)', () => {
    expect(sum(0, 1)).toBe(1);
  });

  it('должна возвращать null при аргументах (null, 2)', () => {
    expect(sum(null, 2)).toBeNull();
  });

  it('должна возвращать null при передаче строк', () => {
    expect(sum('a', 2)).toBeNull();
  });

  it('должна возвращать null при передаче объектов', () => {
    expect(sum({ a: 3 }, [])).toBeNull();
  });
});
