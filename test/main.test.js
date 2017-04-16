import test from 'ava'
import retell from 'retell'
import app from '../src/main'

retell.fixtures = __dirname + '/cassettes'

test('with username', async t => {
  const result = await app({ url: 'samtgarson' })

  t.is(result, '0.034')
})
