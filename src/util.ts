export function isAPromise(obj: any): boolean {
  return obj.then && typeof obj.then === 'function'
}

export function quoteAndCombine(...args: Array<string | number | boolean | any[]>) {
  if (Array.isArray(args[0])) {
    args = args[0]
  }

  return args
    .filter((arg) => arg === '' || arg)
    .map(arg => arg === '' ? `''` : `'${arg}'`)
    .join(', ')
}
