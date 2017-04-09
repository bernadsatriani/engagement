import test from 'ava'
import retell from 'retell'
import * as images from '../src/images'

retell.fixtures = __dirname + '/cassettes'
const user = require('./fixtures/user-response')

test('idFromUser', async t => {
  const result = await images.idFromUser(user)

  t.is(result, '4079668')
})

test('getRecentImages', async t => {
  const { data: { data: result } } = await images.getRecentImages('4079668')

  t.is(result.length, 20)
})

test('integration', async t => {
  const result = await images.default(user)

  t.is(result.length, 20)
  t.true(result.every(i => i.id))
})
