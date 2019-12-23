const mixin = (Super, ...extraMixins) => {
  extraMixins.forEach(extraMixin => {
    Object.assign(Super.prototype, extraMixin)
  })
  return Super
}
export default mixin
