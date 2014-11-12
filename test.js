'use strict';

/**
 * Dependencies.
 */

var iterate,
    assert;

iterate = require('./');
assert = require('assert');

/**
 * Tests.
 */

describe('iterate()', function () {
    it('should be a `function`', function () {
        assert(typeof iterate === 'function');
    });

    it('should throw when no `values` are given', function () {
        assert.throws(function () {
            iterate();
        }, /\|this\| not be undefined/);
    });

    it('should throw when an object without `length` is given', function () {
        assert.throws(function () {
            iterate({});
        }, /\|this\| has a `length`/);
    });

    it('should throw when no `callback` is given', function () {
        assert.throws(function () {
            iterate([]);
        }, /must be a function/);
    });

    it('should iterate over an array with `value`, `index`, and `values`',
        function () {
            var list,
                n;

            list = [0, 1, 2];

            n = 0;

            iterate(list, function (value, index, values) {
                assert(value === n);
                assert(index === n);
                assert(values === list);

                n++;
            });

            assert(n === 3);
        }
    );

    it('should invoke `callback` with `undefined` as context', function () {
        var n;

        n = 0;

        iterate([1, 2, 3], function () {
            assert(this === undefined);

            n++;
        });

        assert(n === 3);
    });

    it('should invoke `callback` with the given `context`', function () {
        var scope,
            n;

        scope = this;

        n = 0;

        iterate([1, 2, 3], function () {
            assert(this === scope);

            n++;
        }, scope);

        assert(n === 3);
    });

    it('should change the next position when `callback` returns a number',
        function () {
            var n;

            n = 0;

            iterate([0, 1, 2], function (value, index) {
                n++;

                assert(value === index);

                /**
                 * Stay on position `0` ten times.
                 */

                if (n <= 10) {
                    return 0;
                }
            });

            assert(n === 13);
        }
    );

    it('should ignore missing values', function () {
        var list,
            magicNumber,
            n;

        magicNumber = 10;

        list = Array(magicNumber);

        list.push(magicNumber + 1);

        iterate(list, function (value, index) {
            assert(value === magicNumber + 1);

            assert(index === magicNumber);

            n = index;
        });

        assert(n === magicNumber);
    });

    it('should NOT fail when a negative index is returned', function () {
        var results,
            n;

        n = 0;

        results = ['a', 'b', 'a', 'b', 'c', 'd'];

        iterate(['a', 'b', 'c', 'd'], function (value) {
            assert(value === results[n]);

            n++;

            if (n === 2) {
                return -1;
            }
        });

        assert(n === results.length);
    });
});
