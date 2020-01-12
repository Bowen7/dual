import { checkOptions, isObject } from './helper'
function transformTransition(transition) {
  if (isObject(transition) && typeof transition.to === 'string') {
    return {
      to: [transition.to],
      input: [transition.input]
    }
  }
  return {
    to: transition.to,
    input: transition.input
  }
}
class FSM {
  constructor(options = {}) {
    if (!checkOptions(options, ['transitions'])) {
      return
    }
    this._init(options)
    this._observer = {}
  }
  _init(options) {
    let _transitions = {}
    let { init = '', transitions = [] } = options
    // transitions接受对象和数组
    if (isObject(transitions)) {
      for (let from in transitions) {
        !init && (init = from)
        const value = transitions[from]
        _transitions[from] = transformTransition(value)
      }
    } else if (Array.isArray(transitions)) {
      transitions.forEach(item => {
        const from = item.from
        !init && (init = from)
        _transitions[from] = transformTransition(item)
      })
    }
    this.state = init
    this.transitions = _transitions
  }
  transit(input) {
    // 可接受单个和多组input
    if (!Array.isArray(input)) {
      input = [input]
    }
    input.forEach(item => {
      const curState = this.state
      const transition = this.transitions[curState]
      const { input: inputArr = [], to = [] } = transition
      const index = inputArr.indexOf(item)
      this.state = to[index]

      // 触发监听函数
      const observer = this._observer[this.state]
      observer &&
        observer.forEach(cb => {
          cb()
        })
    })
    return this.state
  }
  observe(state, cb) {
    if (this._observer[state]) {
      this._observer[state].push(cb)
    } else {
      this._observer[state] = [cb]
    }
  }
}
export default FSM
