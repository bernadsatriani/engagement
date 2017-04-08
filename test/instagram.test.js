import test from 'ava'
import retell from 'retell'
import Instagram from '../lib/instagram'

retell.fixtures = __dirname + '/cassettes'

const token = '4079668.b8be642.23e3d425f2184d8b9782ba1fed386c86'
const handle = 'samtgarson'
const id = '4079668'

let subject
test.beforeEach(() => {
  subject = new Instagram({ handle, token })
})

test('instantiates correctly', t => {
  t.truthy(subject.client)
})

test('finds user', async t => {
  const user = await subject.fetchUser()
  t.is(user.username, 'samtgarson')
})

test('can\'t find user', async t => {
  subject.handle = 'non-existant'
  const error = await t.throws(subject.fetchUser())
  t.regex(error.message, /not be found/)
})

test('finds images', async t => {
  const images = await subject.fetchImages(4079668)
  t.is(images.length, 20)
})
