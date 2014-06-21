var escodegen = require('escodegen')
var esprima   = require('esprima')
var test      = require('tape')
var multiline = require('./')

test('function definition', function(t) {
  var ast = esprima.parse([
      'function test() {/*'
    , 'hello world'
    , '*/}'
  ].join('\n'), {
      comment: true
    , loc: true
  })

  var result = escodegen.generate(
    multiline(ast)
  )

  t.equal(result, "'\\nhello world\\n';")
  t.end()
})

test('function expression', function(t) {
  var ast = esprima.parse([
      'var x = function test() {/*'
    , 'hello world'
    , '*/}'
  ].join('\n'), {
      comment: true
    , loc: true
  })

  var result = escodegen.generate(
    multiline(ast)
  )

  t.equal(result, "var x = '\\nhello world\\n';")
  t.end()
})
