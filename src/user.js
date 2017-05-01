// @flow
import R from 'ramda'
import client from './client'

export const userSearch = async (q: string) => client().get('/users/search', { params: { q } })
export const createUserProcessor = (handle: string) => R.find(R.propEq('username', handle))
export const getUser = (id: string) => client().get(`/users/${id}`)
export default async (h: string) => R.pipeP(
  userSearch,
  R.path(['data', 'data']),
  createUserProcessor(h),
  R.prop('id'),
  getUser,
  R.path(['data', 'data'])
)(h)
