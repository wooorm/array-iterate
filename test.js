import test from 'tape'
import {arrayIterate} from './index.js'

test('arrayIterate()', function (t) {
  t.throws(
    function () {
      // @ts-ignore
      arrayIterate()
    },
    /^Error: Iterate requires that \|this\| not be undefined$/,
    'should throw without `values`'
  )

  t.throws(
    function () {
      // @ts-ignore
      arrayIterate({})
    },
    /Error: Iterate requires that \|this\| has a `length`/,
    'should throw without `values.length`'
  )

  t.throws(
    function () {
      // @ts-ignore
      arrayIterate([])
    },
    /^Error: `callback` must be a function$/,
    'should throw without `callback`'
  )

  t.test('should invoke `callback` each step', function (st) {
    var list = [0, 1, 2]
    var n = 0

    arrayIterate(list, function (value, index, values) {
      st.equal(value, n)
      st.equal(index, n)
      st.equal(values, list)
      st.equal(this, undefined)

      n++
    })

    st.equal(n, 3)
    st.end()
  })

  t.test('should invoke `callback` with context', function (st) {
    var self = this
    var n = 0

    arrayIterate(
      [1, 2, 3],
      function () {
        st.equal(this, self)
        n++
      },
      self
    )

    st.equal(n, 3)
    st.end()
  })

  t.test('should use the given return value', function (st) {
    var n = 0

    arrayIterate([0, 1, 2], function (value, index) {
      n++

      st.equal(value, index)

      // Stay on position `0` ten times.
      if (n <= 10) {
        return 0
      }
    })

    st.equal(n, 13)

    st.end()
  })

  t.test('should ignore missing values', function (st) {
    var magicNumber = 10
    // eslint-disable-next-line unicorn/no-new-array
    var list = new Array(magicNumber)
    var n

    list.push(magicNumber + 1)

    arrayIterate(list, function (value, index) {
      st.equal(value, magicNumber + 1)
      st.equal(index, magicNumber)
      n = index
    })

    st.equal(n, magicNumber)

    st.end()
  })

  t.test('should support negative indices', function (st) {
    var n = 0
    var results = ['a', 'b', 'a', 'b', 'c', 'd']

    arrayIterate(['a', 'b', 'c', 'd'], function (value) {
      st.equal(value, results[n])
      n++

      if (n === 2) {
        return -1
      }
    })

    st.equal(n, results.length)
    st.end()
  })

  t.end()
})
