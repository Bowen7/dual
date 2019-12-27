import HtmlParser from './htmlParser'
class Parser {
  constructor() {
    this.initHtmlParser()
    this.ast = []
    this.stack = []
  }
  initHtmlParser() {
    this.htmlParser = new HtmlParser({
      handlers: {
        startElement: (tagName, attrs) => {
          const node = createNode(tagName, attrs)
          let curNode = null
          if (this.stack.length > 0) {
            curNode = this.stack[this.stack.length - 1]
          }
          if (curNode) {
            curNode.children.push(node)
          } else {
            this.ast.push(node)
          }

          this.stack.push(node)
        },
        endElement: tagName => {
          let top
          do {
            top = this.stack.pop()
          } while (top.tag !== tagName && this.stack.length > 0)
        },
        characters: text => {
          if (this.stack.length > 0) {
            const curNode = this.stack[this.stack.length - 1]
            curNode.content.push(text)
          }
        }
      }
    })
  }
  parse(template) {
    this.ast = []
    this.stack = []
    this.htmlParser.parse(template)
    return this.ast
  }
}

export default new Parser()

function createNode(tagName, attrs) {
  const attrMap = {}
  attrs.forEach(attr => {
    const { name, value } = attr
    attrMap[name] = value
  })
  return {
    tag: tagName,
    attrList: attrs,
    children: [],
    content: [],
    attrMap
  }
}
