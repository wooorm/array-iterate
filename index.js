'use strict';

/**
 * Cache `hasOwnProperty`.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * `Array#forEach()` with the possibility to change
 * the next position.
 *
 * @param {{length: number}} values
 * @param {function(*, number, {length: number}): number|undefined} callback
 * @param {*} context
 */

function iterate(values, callback, context) {
    var index,
        result;

    if (!values) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'not be ' + values
        );
    }

    if (!has.call(values, 'length')) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'has a `length`'
        );
    }

    if (typeof callback !== 'function') {
        throw new Error(
            'TypeError: callback must be a function'
        );
    }

    index = -1;

    /**
     * The length might change, so we do not cache it.
     */

    while (++index < values.length) {
        /**
         * Skip missing values.
         */

        if (!(index in values)) {
            continue;
        }

        result = callback.call(context, values[index], index, values);

        /**
         * If `callback` returns a `number`, move `index` over to
         * `number`.
         */

        if (typeof result === 'number') {
            /**
             * Make sure that negative numbers do not
             * break the loop.
             */

            if (result < 0) {
                index = 0;
            }

            index = result - 1;
        }
    }
}

/**
 * Expose `iterate`.
 */

module.exports = iterate;
