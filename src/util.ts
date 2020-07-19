export function isAPromise(obj: any): boolean {
  return obj.then && typeof obj.then === 'function'
}
