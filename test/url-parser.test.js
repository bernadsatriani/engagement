import test from 'ava'
import UrlParser from '../src/url-parser'

test('for a root url', t => {
  const subject = new UrlParser('http://www.example.com')

  t.false(subject.valid)
})

test('for an invalid url', t => {
  const subject = new UrlParser('http://www.example.com/foo/bar')

  t.false(subject.valid)
})

test('for a valid url', t => {
  const subject = new UrlParser('http://www.example.com/foo')

  t.true(subject.valid)
  t.is(subject.username, 'foo')
})
