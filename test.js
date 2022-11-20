import assert from 'node:assert/strict'
import test from 'node:test'
import {arrayIterate} from './index.js'

test('arrayIterate()', async function (t) {
  assert.throws(
    function () {
      // @ts-expect-error: missing arguments.
      arrayIterate()
    },
    /^Error: Iterate requires that \|this\| not be undefined$/,
    'should throw without `values`'
  )

  assert.throws(
    function () {
      // @ts-expect-error: incorrect arguments.
      arrayIterate({})
    },
    /Error: Iterate requires that \|this\| has a `length`/,
    'should throw without `values.length`'
  )

  assert.throws(
    function () {
      // @ts-expect-error: missing arguments.
      arrayIterate([])
    },
    /^TypeError: `callback` must be a function$/,
    'should throw without `callback`'
  )

  await t.test('should invoke `callback` each step', function () {
    const list = [0, 1, 2]
    let n = 0

    arrayIterate(list, function (value, index, values) {
      assert.equal(value, n)
      assert.equal(index, n)
      assert.equal(values, list)
      assert.equal(this, undefined)

      n++
    })

    assert.equal(n, 3)
  })

  await t.test('should invoke `callback` with context', function () {
    const context = {tada: true}
    let n = 0

    arrayIterate(
      [1, 2, 3],
      function () {
        assert.equal(this, context)
        n++
      },
      context
    )

    assert.equal(n, 3)
  })

  await t.test('should use the given return value', function () {
    let n = 0

    arrayIterate([0, 1, 2], function (value, index) {
      n++

      assert.equal(value, index)

      // Stay on position `0` ten times.
      if (n <= 10) {
        return 0
      }
    })

    assert.equal(n, 13)
  })

  await t.test('should ignore missing values', function () {
    const magicNumber = 10
    /** @type {(number|undefined)[]} */
    // eslint-disable-next-line unicorn/no-new-array
    const list = new Array(magicNumber)
    /** @type {number|undefined} */
    let n

    list.push(magicNumber + 1)

    arrayIterate(list, function (value, index) {
      assert.equal(value, magicNumber + 1)
      assert.equal(index, magicNumber)
      n = index
    })

    assert.equal(n, magicNumber)
  })

  await t.test('should support negative indices', function () {
    let n = 0
    const results = ['a', 'b', 'a', 'b', 'c', 'd']

    arrayIterate(['a', 'b', 'c', 'd'], function (value) {
      assert.equal(value, results[n])
      n++

      if (n === 2) {
        return -1
      }
    })

    assert.equal(n, results.length)
  })
})
