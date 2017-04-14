// @flow
import R from 'ramda'
import client from './client'

export const getRecentImages = async (id: string) => client.get(`/users/${id}/media/recent`)
export const idFromUser = async (o: { id: string }) => R.prop('id', o)
export default R.pipeP(
  idFromUser,
  getRecentImages,
  R.path(['data', 'data'])
)
