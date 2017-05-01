import test from 'ava'
import nowLatest from 'now-latest'
import { get } from 'axios'

test('deployed url works', async t => {
  const { url } = await nowLatest({ token: process.env.NOW_TOKEN, name: 'engagement' })
  try {
    const { data, status } = await get(`https://${url}`)

    t.is(status, 200)
    t.truthy(data.match('<strong>engagement</strong>'))
  } catch (err) {
    t.fail(err)
  }
})
