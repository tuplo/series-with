import seriesWith from '.';

describe('series with', () => {
  it('applies an async function to an array of values sequentially', async () => {
    expect.assertions(2);
    const fnSpy = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve('foo'))
      .mockReturnValueOnce(Promise.resolve('bar'))
      .mockReturnValueOnce(Promise.resolve('baz'));
    const result = await seriesWith([1, 2, 3], fnSpy);

    const expected = ['foo', 'bar', 'baz'];
    expect(result).toStrictEqual(expected);
    expect(fnSpy).toHaveBeenCalledTimes(3);
  });

  it('accepts a type variable', async () => {
    expect.assertions(1);
    const fnSpy = jest.fn().mockReturnValue(Promise.resolve('foo'));
    const result = await seriesWith<string>([1, 2, 3], fnSpy);

    const expected = ['foo', 'foo', 'foo'];
    expect(result).toStrictEqual(expected);
  });

  it('throws an exception', async () => {
    expect.assertions(1);
    const errorFn = (): never => {
      throw Error('foo');
    };
    const fn = seriesWith([1, 2, 3], errorFn);

    await expect(fn).rejects.toThrow('foo');
  });

  it('accepts a non async function as iteratee', async () => {
    expect.assertions(1);
    const fn = (n: number): number => n * 2;
    const result = await seriesWith([1, 2, 4], fn);

    const expected = [2, 4, 8];
    expect(result).toStrictEqual(expected);
  });
});
