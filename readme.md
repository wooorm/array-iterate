# array-iterate

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[`Array#forEach()`][foreach] with the possibility to change the next position.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install array-iterate
```

## Use

```js
import {arrayIterate} from 'array-iterate'

var isFirst = true
var thisArg = {hello: 'world'}

arrayIterate([1, 2, 3, 4], callbackFn, thisArg)

function callbackFn(value, index, values) {
  console.log(this, value, index, values)

  if (isFirst && index + 1 === values.length) {
    isFirst = false
    return 0
  }
}
```

Yields:

```js
{hello: 'world'}, 1, 0, [1, 2, 3, 4]
{hello: 'world'}, 2, 1, [1, 2, 3, 4]
{hello: 'world'}, 3, 2, [1, 2, 3, 4]
{hello: 'world'}, 4, 3, [1, 2, 3, 4]
{hello: 'world'}, 1, 0, [1, 2, 3, 4]
{hello: 'world'}, 2, 1, [1, 2, 3, 4]
{hello: 'world'}, 3, 2, [1, 2, 3, 4]
{hello: 'world'}, 4, 3, [1, 2, 3, 4]
```

## API

This package exports the following identifiers: `arrayIterate`.
There is no default export.

### `arrayIterate(values, callbackFn[, thisArg])`

Perform the specified action for each element in an array, so works just like
[`Array#forEach()`][foreach].
When `callbackFn` returns a `number`, moves to the element at that index next.

###### Parameters

*   `values` (`Array`-like thing)
    — Values to iterate over
*   `callbackFn` ([`Function`][callback])
    — A function that accepts up to three arguments
*   `thisArg` (`*`, optional)
    — An object to which the this keyword can refer in `callbackFn`.
    If `thisArg` is omitted, `undefined` is used as the `this` value

#### `function callbackFn(value, index, values)`

Callback given to `iterate`.

###### Parameters

*   `value` (`*`) — Current iteration
*   `index` (`number`) — Position of `value` in `values`
*   `values` (`Array`-like thing) — Currently iterated over

###### Context

`thisArg` when given to `arrayIterate` or `undefined`

###### Returns

`number` (optional) — Position to go to next.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/array-iterate/workflows/main/badge.svg

[build]: https://github.com/wooorm/array-iterate/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/array-iterate.svg

[coverage]: https://codecov.io/github/wooorm/array-iterate

[downloads-badge]: https://img.shields.io/npm/dm/array-iterate.svg

[downloads]: https://www.npmjs.com/package/array-iterate

[size-badge]: https://img.shields.io/bundlephobia/minzip/array-iterate.svg

[size]: https://bundlephobia.com/result?p=array-iterate

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

[callback]: #function-callbackfnvalue-index-values
