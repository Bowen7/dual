import { checkOptions, isObject } from './helper'
class FSM {
  constructor(options = {}) {
    if (!checkOptions(options, ['transitions'])) {
      return
    }
  }
  init(options) {
    let _transitions = {}
    let { init = '', transitions = [] } = options
    if (!init) {
      init = transitions[0] && transitions[0].from
    }
    if (isObject(transitions)) {
      for (let key in transitions) {
        const value = transitions[key]
        if (isObject(value) && typeof value.to === 'string') {
          _transitions[key] = {
            to: [value.to],
            input: [value.input]
          }
          continue
        }
        _transitions[key] = value
      }
    } else if (Array.isArray(transitions)) {
      transitions.forEach(item => {
        if (isObject(item) && typeof item.to === 'string') {
          _transitions[item.from] = {
            to: [item.to],
            input: [item.input]
          }
          return
        }
        _transitions[item.from] = {
          to: item.to,
          input: item.input
        }
      })
    }
    this.state = init
    this.transitions = _transitions
  }
  transit(input) {
    let resultState
    this.transitions.forEach(transition => {
      if (transition.from === this.state && transition.input === input) {
        resultState = transition.to
      }
    })
    this.state = resultState
    return this.state
  }
}
export default FSM
