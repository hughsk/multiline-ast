var astw = require('astw')

module.exports = multiline

var notice = 'You must include {"comments": true, "loc": true} in your esprima parsing options'

function multiline(ast) {
  var walk = astw(ast)

  if (!ast.comments) throw new Error(notice)

  var comments = ast.comments.filter(function(comment) {
    return comment.type === 'Block'
  })

  if (!comments.length) return ast
  if (!comments[0].loc) throw new Error(notice)

  walk(function(node) {
    if (node.type !== 'FunctionDeclaration'
     && node.type !== 'FunctionExpression'
    ) return
    if (node.body.body.length) return

    for (var i = 0; i < comments.length; i++) {
      var com = comments[i]

      if (com.loc.start.line < node.loc.start.line) continue
      if (com.loc.start.column < node.loc.start.column) continue
      if (com.loc.end.line > node.loc.end.line) continue
      if (com.loc.end.column > node.loc.end.column) continue

      replace(node, com.value)
    }
  })

  return ast

  function replace(node, value) {
    var type = node.type

    for (var k in node) {
      if (k === 'loc') continue
      if (k === 'parent') continue
      if (node.hasOwnProperty(k)) {
        delete node[k]
      }
    }

    value = {
        type: 'Literal'
      , value: String(value)
    }

    if (type === 'FunctionDeclaration') {
      node.type = 'ExpressionStatement'
      node.expression = value
    } else {
      node.type = value.type
      node.value = value.value
    }
  }
}
