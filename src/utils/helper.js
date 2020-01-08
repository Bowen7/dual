export const isObject = target => {
  return Object.prototype.toString.call(target) === '[object Object]'
}
