export const isObject = target => {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export const hasOwnProperty = (target, key) => {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export const checkOptions = (options, requiredOptions = []) => {
  let checkResult = true
  requiredOptions.forEach(key => {
    if (!hasOwnProperty(options, key)) {
      console.error(`options: ${key} is required`)
      checkResult = false
    }
  })
  return checkResult
}
