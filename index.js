const own = {}.hasOwnProperty

/**
 * Perform the specified action for each element in an array.
 * When `callbackFn` returns a `number`, moves to the element at that index next.
 *
 * @template {any} Value
 * @template {ArrayLike<Value>} Values
 * @param {Values} values Values to iterate over
 * @param {(value: Value, index: number, array: Values) => number | void} callbackFn A function that accepts up to three arguments
 * @param {any} [thisArg] thisArg An object to which the this keyword can refer in `callbackFn`. If `thisArg` is omitted, `undefined` is used as the `this` value.
 * @returns {void}
 */
export function arrayIterate(values, callbackFn, thisArg) {
  let index = -1

  if (!values) {
    throw new Error('Iterate requires that |this| not be ' + values)
  }

  if (!own.call(values, 'length')) {
    throw new Error('Iterate requires that |this| has a `length`')
  }

  if (typeof callbackFn !== 'function') {
    throw new TypeError('`callback` must be a function')
  }

  // The length might change, so we do not cache it.
  while (++index < values.length) {
    // Skip missing values.
    if (!(index in values)) {
      continue
    }

    const result = callbackFn.call(thisArg, values[index], index, values)

    // If `callback` returns a `number`, move `index` over to `number`.
    if (typeof result === 'number') {
      // Make sure that negative numbers do not break the loop.
      if (result < 0) {
        index = 0
      }

      index = result - 1
    }
  }
}
