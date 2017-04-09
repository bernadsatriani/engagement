import test from 'ava'
import retell from 'retell'
import * as user from '../src/user'

retell.fixtures = __dirname + '/cassettes'

test('userSearch', async t => {
  const { data: { data: found } } = await user.userSearch('samtgarson')
  const { data: { data: notFound } } = await user.userSearch('non-existant')

  t.is(found[0].id, '4079668')
  t.deepEqual(notFound, [])
})

test('createUserProcessor', t => {
  const processor = user.createUserProcessor('samtgarson')
  const result = processor(require('./fixtures/search-response'))

  t.is(result.id, '4079668')
})

test('getUser', async t => {
  const { data: { data: result } } = await user.getUser('4079668')

  t.is(result.username, 'samtgarson')
  t.truthy(result.counts)
})

test('integration', async t => {
  const result = await user.default('samtgarson')

  t.is(result.username, 'samtgarson')
  t.truthy(result.counts)
})
