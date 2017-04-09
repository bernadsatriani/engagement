import test from 'ava'
import retell from 'retell'
import calculate from '../src/calculate'

retell.fixtures = __dirname + '/cassettes'

test('app', async t => {
  const result = await calculate('samtgarson')

  t.is(result, '0.034')
})
