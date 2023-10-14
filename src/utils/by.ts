export function keyBy<T>(arr: T[], key: string | ((element: T) => string)): Record<string, T> {
  return arr.reduce(function (acc: Record<string, T>, el: any) {
    acc[typeof key === 'function' ? key(el) : el[key]] = el;
    return acc;
  }, {});
};
