import test from 'ava'
import nowLatest from 'now-latest'
import { get } from 'axios'

test('deployed url works', async t => {
  const { url } = await nowLatest({ token: process.env.NOW_TOKEN, name: 'engagement' })
  const { data, status } = await get(`https://${url}/samtgarson`)
  const result = parseFloat(data, 10)

  t.is(status, 200)
  t.is(typeof result, 'number')
})
