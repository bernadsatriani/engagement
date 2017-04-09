import R from 'ramda'
import getUsername from './url'
import calculate from './calculate'

export default R.pipeP(
  async o => R.prop('url', o),
  getUsername,
  calculate
)
