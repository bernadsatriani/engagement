import test from 'ava'
import vcr from 'nock-vcr-recorder'
import Instagram from '../lib/instagram'

vcr.config({
  cassetteLibraryDir: 'test/cassettes'
})

const token = '4079668.b8be642.23e3d425f2184d8b9782ba1fed386c86'
// const badToken = '4079668.b8be642.23e3d425f2184d8b9782ba1fed386c8'
const handle = 'samtgarson'

let subject
test.before(() => {
  subject = new Instagram({ handle, token })
})

test('instantiates correctly', t => {
  t.truthy(subject.client)
})

test('#user', async t => {
  const user = await vcr.useCassette('user-200', () => subject.user)
  t.is(user.username, 'samtgarson')
})
