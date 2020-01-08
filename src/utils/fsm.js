import { isObject } from './helper'
const fatalSymbol = Symbol('fatal')
class FSM {
  constructor(options = {}) {
    if (!this.checkOptions(options)) {
      return
    }
    let { init = '', transitions = [] } = options
    if (!init) {
      init = transitions[0] && transitions[0].from
    }
    this.state = init
    this.transitions = transitions
  }
  checkOptions(options) {
    const requiredOptions = ['transitions']
    let checkResult = true
    requiredOptions.forEach(key => {
      if (!hasOwnProperty(options, key)) {
        console.error(`options: ${key} is required`)
        this.state = fatalSymbol
        checkResult = false
      }
    })
    return checkResult
  }
  check() {
    if (this.state === fatalSymbol) {
      console.error('fatal FSM. check it')
      return false
    }
    return true
  }
  transit(input) {
    if (!this.check()) {
      return
    }
  }
}
function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}
export default FSM
