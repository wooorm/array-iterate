# array-iterate [![Build Status](https://img.shields.io/travis/wooorm/array-iterate.svg?style=flat)](https://travis-ci.org/wooorm/array-iterate) [![Coverage Status](https://img.shields.io/coveralls/wooorm/array-iterate.svg?style=flat)](https://coveralls.io/r/wooorm/array-iterate?branch=master)

[`Array#forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) with the possibility to change the next position.

## Installation

npm:
```sh
$ npm install array-iterate
```

Component.js:
```sh
$ component install wooorm/array-iterate
```

Bower:
```sh
$ bower install array-iterate
```

## Usage

````js
var iterate = require('array-iterate');
var isFirst = true;
var context = 'iterate';

iterate([1, 2, 3, 4], function (value, index, values) {
    console.log(this, value, index, values)

    if (isFirst && index + 1 === values.length) {
        isFirst = false;

        return 0;
    }
}, context);
/**
 * [String: 'iterate'], 1, 0, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 2, 1, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 3, 2, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 4, 3, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 1, 0, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 2, 1, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 3, 2, [ 1, 2, 3, 4 ]
 * [String: 'iterate'], 4, 3, [ 1, 2, 3, 4 ]
 */
````

## API

### iterate(arrayLike, callback, context)

Functions just like [`Array#forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), but when `callback` returns a `number`, iterates over the item at `number` next.

## License

MIT © [Titus Wormer](http://wooorm.com)
