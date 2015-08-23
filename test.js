/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module array-iterate
 * @fileoverview Test suite for array-iterate.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var iterate = require('./');

/*
 * Methods.
 */

var throws = assert.throws;
var equal = assert.strictEqual;

/*
 * Tests.
 */

describe('iterate()', function () {
    it('should throw when no `values` are given', function () {
        throws(function () {
            iterate();
        }, /\|this\| not be undefined/);
    });

    it('should throw when an object without `length` is given', function () {
        throws(function () {
            iterate({});
        }, /\|this\| has a `length`/);
    });

    it('should throw when no `callback` is given', function () {
        throws(function () {
            iterate([]);
        }, /must be a function/);
    });

    it('should iterate over an array with `value`, `index`, and `values`',
        function () {
            var list = [0, 1, 2];
            var n = 0;

            iterate(list, function (value, index, values) {
                equal(value, n);
                equal(index, n);
                equal(values, list);

                n++;
            });

            equal(n, 3);
        }
    );

    it('should invoke `callback` with `undefined` as context', function () {
        var n = 0;

        iterate([1, 2, 3], function () {
            equal(this, undefined);

            n++;
        });

        equal(n, 3);
    });

    it('should invoke `callback` with the given `context`', function () {
        var self = this;
        var n = 0;

        iterate([1, 2, 3], function () {
            equal(this, self);

            n++;
        }, self);

        equal(n, 3);
    });

    it('should change the next position when `callback` returns a number',
        function () {
            var n = 0;

            iterate([0, 1, 2], function (value, index) {
                n++;

                equal(value, index);

                /**
                 * Stay on position `0` ten times.
                 */

                if (n <= 10) {
                    return 0;
                }
            });

            equal(n, 13);
        }
    );

    it('should ignore missing values', function () {
        var magicNumber = 10;
        var list = Array(magicNumber);
        var n;

        list.push(magicNumber + 1);

        iterate(list, function (value, index) {
            equal(value, magicNumber + 1);

            equal(index, magicNumber);

            n = index;
        });

        equal(n, magicNumber);
    });

    it('should NOT fail when a negative index is returned', function () {
        var n = 0;
        var results = ['a', 'b', 'a', 'b', 'c', 'd'];

        iterate(['a', 'b', 'c', 'd'], function (value) {
            equal(value, results[n]);

            n++;

            if (n === 2) {
                return -1;
            }
        });

        equal(n, results.length);
    });
});
