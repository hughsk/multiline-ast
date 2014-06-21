# multiline-ast [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Take an esprima AST and convert
[multiline](http://github.com/sindresorhus/multiline)-style comment functions
into strings.

## Usage

[![NPM](https://nodei.co/npm/multiline-ast.png)](https://nodei.co/npm/multiline-ast/)

### multiline(ast)

Pass an esprima-generated `ast` object to the module to traverse the tree and
replace functions in the following style:

``` js
var x = function() {/*
  hello world
*/}
```

With strings, such as this:

``` js
var x = '\n  hello world\n'
```

Note that you must pass the correct options to esprima while parsing to include
comment information correctly, i.e.:

``` js
var ast = esprima.parse(code, {
    comment: true
  , ast: true
})
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/multiline-ast/blob/master/LICENSE.md) for details.
