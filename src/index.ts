function seriesWith<Out, In = unknown>(
  xs: In[],
  fn: (x: In) => Promise<Out> | Out
): Promise<Out[]> {
  return xs.reduce(
    (p: Promise<Out[]>, x: In): Promise<Out[]> =>
      p.then((acc) => Promise.resolve(fn(x)).then((r) => [...acc, r])),
    Promise.resolve([])
  );
}

export default seriesWith;
