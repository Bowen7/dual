// http://erik.eae.net/simplehtmlparser/simplehtmlparser.js

const startTagRe = /^<([^>\s/]+)((\s+[^=>\s]+(\s*=\s*(("[^"]*")|('[^']*')|[^>\s]+))?)*)\s*\/?\s*>/m
const endTagRe = /^<\/([^>\s]+)[^>]*>/m
const attrRe = /([^=\s]+)(\s*=\s*(("([^"]*)")|('([^']*)')|[^>\s]+))?/gm

class HtmlParser {
  constructor(options = {}) {
    const { handler = {} } = options
    this.handler = handler
  }
  parse(s, oHandler) {
    if (oHandler) this.contentHandler = oHandler

    var lm, rc, index
    var treatAsChars = false
    while (s.length > 0) {
      // Comment
      if (s.substring(0, 4) == '<!--') {
        index = s.indexOf('-->')
        if (index != -1) {
          this.contentHandler.comment(s.substring(4, index))
          s = s.substring(index + 3)
          treatAsChars = false
        } else {
          treatAsChars = true
        }
      }

      // end tag
      else if (s.substring(0, 2) == '</') {
        if (endTagRe.test(s)) {
          lm = RegExp.lastMatch
          rc = RegExp.rightContext

          lm.replace(endTagRe, (...args) => {
            return this.parseEndTag(...args)
          })

          s = rc
          treatAsChars = false
        } else {
          treatAsChars = true
        }
      }
      // start tag
      else if (s.charAt(0) == '<') {
        if (startTagRe.test(s)) {
          lm = RegExp.lastMatch
          rc = RegExp.rightContext

          lm.replace(startTagRe, (...args) => {
            return this.parseStartTag(...args)
          })

          s = rc
          treatAsChars = false
        } else {
          treatAsChars = true
        }
      }

      if (treatAsChars) {
        index = s.indexOf('<')
        if (index == -1) {
          this.contentHandler.characters(s)
          s = ''
        } else {
          this.contentHandler.characters(s.substring(0, index))
          s = s.substring(index)
        }
      }

      treatAsChars = true
    }
  }

  parseStartTag(sTag, sTagName, sRest) {
    var attrs = this.parseAttributes(sTagName, sRest)
    this.contentHandler.startElement(sTagName, attrs)
  }

  parseEndTag(sTag, sTagName) {
    this.contentHandler.endElement(sTagName)
  }

  parseAttributes(sTagName, s) {
    var attrs = []
    s.replace(attrRe, (a0, a1, a2, a3, a4, a5, a6) => {
      attrs.push(this.parseAttribute(sTagName, a0, a1, a2, a3, a4, a5, a6))
    })
    return attrs
  }

  parseAttribute(sTagName, sAttribute, sName) {
    var value = ''
    if (arguments[7]) value = arguments[8]
    else if (arguments[5]) value = arguments[6]
    else if (arguments[3]) value = arguments[4]

    var empty = !value && !arguments[3]
    return { name: sName, value: empty ? true : value }
  }
}

export default HtmlParser
