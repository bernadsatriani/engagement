import test from 'ava'
import retell from 'retell'
import * as engagement from '../src/engagement'

const user = require('./fixtures/user-response')
const images = require('./fixtures/images-response')
const mappedLikes = images.map(i => i.likes.count)
const mappedComments = images.map(i => i.comments.count)
const allEngagements = [...mappedLikes, ...mappedComments]
const average = allEngagements.reduce((a, b) => a + b) / allEngagements.length
const { default: integration } = engagement

test('getLikesFromImages', t => {
  const result = engagement.getLikesFromImages(images)

  t.deepEqual(result, mappedLikes)
})

test('getCommentsFromImages', t => {
  const result = engagement.getCommentsFromImages(images)

  t.deepEqual(result, mappedComments)
})

test('integration', t => {
  const result = integration(user)(images)
  const engagement = average / user.counts.followed_by

  t.is(result, engagement)
})
