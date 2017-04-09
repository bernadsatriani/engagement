import R from 'ramda'
import client from './client'

export const userSearch = async q => client.get('/users/search', { params: { q } })
export const createUserProcessor = handle => R.find(R.propEq('username', handle))
export const getUser = id => client.get(`/users/${id}`)
export default async h => R.pipeP(
  userSearch,
  R.path(['data', 'data']),
  createUserProcessor(h),
  R.prop('id'),
  getUser,
  R.path(['data', 'data'])
)(h)
