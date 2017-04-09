import R from 'ramda'
import axios from 'axios'
const client = axios.create({
  baseURL: 'https://api.instagram.com/v1',
  params: { access_token: process.env.INSTAGRAM_TOKEN } // eslint-disable-line camelcase
})

export const userSearch = async q => client.get('/users/search', { params: { q } })
export const createUserProcessor = handle => R.find(R.propEq('username', handle))
const getUser = id => client.get(`/users/${id}`)
export const userForHandle = async h => R.pipeP(
  userSearch,
  R.path(['data', 'data']),
  createUserProcessor(h),
  R.prop('id'),
  getUser,
  R.path(['data', 'data'])
)(h)

export const getRecentImages = async id => client.get(`/users/${id}/media/recent`)
export const imagesForUser = R.pipeP(
  async o => R.prop('id', o),
  getRecentImages,
  R.path(['data', 'data'])
)

export const getLikes = R.map(R.path(['likes', 'count']))
export const averageLikes = R.pipe(getLikes, R.mean)
export const calculateEngagement = user => R.pipe(
  averageLikes,
  R.divide(R.__, user.counts.followed_by)
)


export default async handle => {
  const user = await userForHandle(handle)
  return R.pipeP(
    imagesForUser,
    calculateEngagement(user)
  )(user)
}
