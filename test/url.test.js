import test from 'ava'
import url from '../src/url'

test('for a root url', t => {
  const res = url('http://www.example.com')

  t.is(res, undefined)
})

test('for an longer url', t => {
  const res = url('http://www.example.com/foo/bar')

  t.is(res, 'foo')
})

test('for a valid url', t => {
  const res = url('http://www.example.com/foo')

  t.is(res, 'foo')
})
